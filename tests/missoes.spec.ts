import { test, expect, type Page } from '@playwright/test';

const missao = { idMissao: 2, tituloMissao: 'Ir de bike ao trabalho', tipoMissao: 'BICICLETA', descricao: 'Pedale até o trabalho e registre sua atividade.', pontoBase: 50, ativa: true };
const usuario = { idUsuario: 7, nome: 'Usuário de teste', ativo: true, saldoPontos: 0, pontosXp: 0 };
const base = 'https://soulpass-api-l23x.onrender.com';

type AcaoTeste = { idAcao: number; idUsuario: number; idMissao: number; metodoValidacao: string; codigoValidacao: string; statusAprovacao: string; pontosConquistados: number; dataConclusao: string };
async function simular(page: Page) {
  const acoes: AcaoTeste[] = [];
  let saldo = 0;
  let posts = 0;
  let puts = 0;
  await page.route(`${base}/**`, async route => {
    const req = route.request();
    const caminho = new URL(req.url()).pathname;
    let body: unknown;
    let status = 200;
    if (caminho === '/missoes/ativas') body = [missao];
    else if (caminho === '/missoes/2') body = missao;
    else if (caminho === '/usuarios/7') body = { ...usuario, saldoPontos: saldo, pontosXp: saldo };
    else if (caminho === '/acoes/usuario/7') body = acoes;
    else if (caminho === '/acoes' && req.method() === 'POST') {
      posts++;
      const dados = req.postDataJSON();
      expect(dados).toMatchObject({ idUsuario: 7, idMissao: 2 });
      const acao = { ...dados, idAcao: acoes.length + 1, codigoValidacao: 'CODIGO-2-123456', statusAprovacao: 'PENDENTE', pontosConquistados: 0, dataConclusao: '2026-10-30' };
      acoes.push(acao); body = acao; status = 201;
    } else if (/^\/acoes\/\d+\/aprovar$/.test(caminho) && req.method() === 'PUT') {
      puts++;
      const acao = acoes.find(a => a.idAcao === Number(caminho.split('/')[2]))!;
      expect(req.postDataJSON()).toHaveProperty('codigo');
      if (acao.statusAprovacao !== 'PENDENTE') { status = 409; body = { mensagem: 'Atividade já processada.' }; }
      else {
        acao.statusAprovacao = req.postDataJSON().codigo === acao.codigoValidacao ? 'APROVADO' : 'REJEITADO';
        acao.pontosConquistados = acao.statusAprovacao === 'APROVADO' ? 50 : 0;
        saldo += acao.pontosConquistados; body = acao;
      }
    } else { status = 404; body = { mensagem: 'Não encontrado.' }; }
    await route.fulfill({ status, json: body });
  });
  return { acoes, posts: () => posts, puts: () => puts };
}
async function abrir(page: Page) {
  await page.goto('/solucao/feed');
  await page.getByRole('link', { name: `Ver missão: ${missao.tituloMissao}` }).click();
  await expect(page).toHaveURL(/\/solucao\/missoes\/2$/);
  await page.getByLabel('ID do usuário').fill('7');
  await page.getByRole('button', { name: 'Selecionar usuário' }).click();
  await expect(page.getByText('Saldo confirmado:')).toContainText('0 pontos');
}

test('navega, registra todos os métodos e credita somente após aprovação', async ({ page }) => {
  const api = await simular(page);
  await abrir(page);
  for (const [indice, metodo] of ['CHECKIN', 'QRCODE', 'CODIGO'].entries()) {
    await page.getByLabel('Método de validação').selectOption(metodo);
    await page.getByRole('button', { name: 'Registrar atividade', exact: true }).click();
    const cartao = page.getByRole('article').filter({ has: page.getByRole('heading', { name: `Atividade #${indice + 1}`, exact: true }) });
    await expect(cartao).toContainText('Status: PENDENTE');
    await expect(cartao).toContainText('Nenhum ponto concedido');
    await expect(page.getByText('Saldo confirmado:')).toContainText(`${indice * 50} pontos`);
    await cartao.getByLabel('Digite o código para validar').fill('CODIGO-2-123456');
    await cartao.getByRole('button', { name: 'Validar atividade' }).click();
    await expect(cartao).toContainText('Status: APROVADO');
    await expect(cartao).toContainText('50 pontos conquistados');
    await expect(cartao.getByRole('button', { name: 'Validar atividade' })).toHaveCount(0);
    await expect(page.getByText('Saldo confirmado:')).toContainText(`${(indice + 1) * 50} pontos`);
    if (indice < 2) await page.getByRole('button', { name: 'Registrar outra atividade' }).click();
  }
  expect(api.posts()).toBe(3); expect(api.puts()).toBe(3);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `test-results/fluxo-${test.info().project.name}.png`, fullPage: true });
});

test('código incorreto com HTTP 200 exibe rejeição sem pontos', async ({ page }) => {
  await simular(page); await abrir(page);
  await page.getByRole('button', { name: 'Registrar atividade', exact: true }).click();
  await page.getByLabel('Digite o código para validar').fill('ERRADO');
  await page.getByRole('button', { name: 'Validar atividade' }).click();
  await expect(page.getByText('Status: REJEITADO')).toBeVisible();
  await expect(page.getByText('Saldo confirmado:')).toContainText('0 pontos');
  await expect(page.getByRole('button', { name: 'Validar atividade' })).toHaveCount(0);
});

test('feed mostra carregamento, erro, retry e lista vazia', async ({ page }) => {
  let liberar!: () => void;
  const espera = new Promise<void>(resolve => { liberar = resolve; });
  await page.route(`${base}/missoes/ativas`, async route => { await espera; await route.fulfill({ status: 500, json: { mensagem: 'Servidor indisponível.' } }); });
  await page.goto('/solucao/feed');
  await expect(page.getByRole('status')).toContainText('Carregando');
  liberar();
  await expect(page.getByRole('alert')).toContainText('Servidor indisponível');
  await page.unroute(`${base}/missoes/ativas`);
  await page.route(`${base}/missoes/ativas`, route => route.fulfill({ json: [] }));
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByRole('status')).toContainText('Nenhuma missão disponível');
});

test('trata ID inválido e missão inexistente', async ({ page }) => {
  await simular(page);
  await page.goto('/solucao/missoes/abc');
  await expect(page.getByRole('alert')).toContainText('Identificador de missão inválido');
  await page.goto('/solucao/missoes/999');
  await expect(page.getByRole('alert')).toContainText('Não encontrado');
  await expect(page.getByRole('button', { name: 'Registrar atividade', exact: true })).toHaveCount(0);
});

test('erros de cadastro da ação não anunciam sucesso e formulário exige código', async ({ page }) => {
  await simular(page); await abrir(page);
  await page.route(`${base}/acoes`, route => route.fulfill({ status: 409, json: { mensagem: 'Missão indisponível.' } }));
  await page.getByRole('button', { name: 'Registrar atividade', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Missão indisponível');
  await expect(page.getByText('Código de validação:')).toHaveCount(0);
  await page.unroute(`${base}/acoes`);
  await page.getByRole('button', { name: 'Registrar atividade', exact: true }).click();
  await page.getByRole('button', { name: 'Validar atividade' }).click();
  await expect(page.getByText('Informe o código de validação.')).toBeVisible();
});

test('recupera atividades após recarregar e trata erro de rede na aprovação', async ({ page }) => {
  const api = await simular(page); await abrir(page);
  await page.getByRole('button', { name: 'Registrar atividade', exact: true }).click();
  await expect(page.getByText('Status: PENDENTE')).toBeVisible();
  await page.reload();
  await page.getByLabel('ID do usuário').fill('7');
  await page.getByRole('button', { name: 'Selecionar usuário' }).click();
  await expect(page.getByText('Status: PENDENTE')).toBeVisible();
  await page.route(`${base}/acoes/1/aprovar`, async route => {
    api.acoes[0].statusAprovacao = 'APROVADO'; api.acoes[0].pontosConquistados = 50;
    await route.abort();
  });
  await page.getByLabel('Digite o código para validar').fill('CODIGO-2-123456');
  await page.getByRole('button', { name: 'Validar atividade' }).click();
  await expect(page.getByText('Status: APROVADO')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Validar atividade' })).toHaveCount(0);
});

test('preserva erro de aprovação mesmo após atualizar histórico recuperado', async ({ page }) => {
  await simular(page); await abrir(page);
  await page.getByRole('button', { name: 'Registrar atividade', exact: true }).click();
  await expect(page.getByText('Status: PENDENTE')).toBeVisible();
  await page.reload();
  await page.getByLabel('ID do usuário').fill('7');
  await page.getByRole('button', { name: 'Selecionar usuário' }).click();
  await page.route(`${base}/acoes/1/aprovar`, route => route.fulfill({ status: 400, json: { mensagem: 'Validação indisponível agora.' } }));
  await page.getByLabel('Digite o código para validar').fill('CODIGO-2-123456');
  await page.getByRole('button', { name: 'Validar atividade' }).click();
  await expect(page.getByRole('alert')).toContainText('Validação indisponível agora.');
  await expect(page.getByText('Saldo confirmado:')).toContainText('0 pontos');
  await expect(page.getByText('Status: PENDENTE')).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Validação indisponível agora.');
});

test('bloqueia registros simultâneos enquanto o POST está em andamento', async ({ page }) => {
  await simular(page); await abrir(page);
  let liberar!: () => void;
  const espera = new Promise<void>(resolve => { liberar = resolve; });
  let chamadas = 0;
  await page.route(`${base}/acoes`, async route => {
    chamadas++;
    await espera;
    await route.fulfill({ status: 409, json: { mensagem: 'Registro recusado para teste.' } });
  });
  await page.getByRole('button', { name: 'Registrar atividade', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Registrando…' })).toBeDisabled();
  expect(chamadas).toBe(1);
  liberar();
  await expect(page.getByRole('alert')).toContainText('Registro recusado para teste.');
});
