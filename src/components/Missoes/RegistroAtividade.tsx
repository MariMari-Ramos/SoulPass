import HistoricoMissao from './HistoricoMissao';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AcaoRealizada, MetodoValidacao, Missao, Usuario } from '../../types/api';
import { buscarUsuarioPorId } from '../../services/usuarioService';
import { registrarAcao } from '../../services/acaoService';
import { botaoMissao, campoMissao, mensagemErro } from './EstadoConsulta';

export default function RegistroAtividade({ missao }: { missao: Missao }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [acao, setAcao] = useState<AcaoRealizada | null>(null);
  const [erro, setErro] = useState('');
  const bloqueio = useRef(false);
  const selecao = useForm<{ idUsuario: string }>();
  const registro = useForm<{ metodoValidacao: MetodoValidacao }>({ defaultValues: { metodoValidacao: 'CHECKIN' } });

  const selecionar = selecao.handleSubmit(async ({ idUsuario }) => {
    if (bloqueio.current) return;
    bloqueio.current = true;
    setErro('');
    try {
      const encontrado = await buscarUsuarioPorId(Number(idUsuario));
      if (!encontrado.ativo) throw new Error('Este usuário está inativo.');
      setUsuario(encontrado);
      setAcao(null);
    } catch (erro) { setErro(mensagemErro(erro)); }
    finally { bloqueio.current = false; }
  });

  const registrar = registro.handleSubmit(async ({ metodoValidacao }) => {
    if (!usuario || bloqueio.current || !missao.ativa) return;
    bloqueio.current = true;
    setErro('');
    try {
      setAcao(await registrarAcao({ idUsuario: usuario.idUsuario, idMissao: missao.idMissao, metodoValidacao }));
    } catch (erro) { setErro(mensagemErro(erro)); }
    finally { bloqueio.current = false; }
  });

  return <section className="space-y-5 rounded-2xl bg-[#2d2d2d] p-6 md:p-8" aria-labelledby="registro-titulo">
    <h2 id="registro-titulo" className="text-2xl font-bold">Registrar atividade</h2>
    <p className="text-white/80">Ambiente de demonstração: informe o ID de um usuário cadastrado na API. Esta seleção não é um login.</p>
    <form onSubmit={selecionar} className="space-y-3">
      <label htmlFor="usuario-id" className="block font-semibold">ID do usuário</label>
      <input id="usuario-id" inputMode="numeric" className={campoMissao} aria-invalid={!!selecao.formState.errors.idUsuario} aria-describedby="usuario-erro"
        {...selecao.register('idUsuario', { required: 'Informe o ID do usuário.', validate: valor => /^\d+$/.test(valor) && Number.isSafeInteger(Number(valor)) && Number(valor) > 0 || 'Informe um ID inteiro positivo.' })} />
      <p id="usuario-erro" className="text-red-300">{selecao.formState.errors.idUsuario?.message}</p>
      <button className={botaoMissao} disabled={selecao.formState.isSubmitting || registro.formState.isSubmitting}>{selecao.formState.isSubmitting ? 'Buscando usuário…' : 'Selecionar usuário'}</button>
    </form>
    {usuario && <>
      <p role="status">Usuário selecionado: <strong>{usuario.nome}</strong> (ID {usuario.idUsuario})</p>
      {missao.ativa && !acao && <form onSubmit={registrar} className="space-y-4">
        <label htmlFor="metodo" className="block font-semibold">Método de validação</label>
        <select id="metodo" className={campoMissao} {...registro.register('metodoValidacao', { required: true })}>
          <option value="CHECKIN">Check-in</option><option value="QRCODE">QR Code</option><option value="CODIGO">Código</option>
        </select>
        <p className="text-sm text-white/80">O código será exibido como texto. Os pontos só serão concedidos após a aprovação pela API.</p>
        <button className={botaoMissao} disabled={registro.formState.isSubmitting || selecao.formState.isSubmitting}>{registro.formState.isSubmitting ? 'Registrando…' : 'Registrar atividade'}</button>
      </form>}
    </>}
    {acao && <button type="button" className={botaoMissao} onClick={() => setAcao(null)}>Registrar outra atividade</button>}
    {acao && <div role="status" className="space-y-2"><p>Atividade #{acao.idAcao}: {acao.statusAprovacao}</p><p>Código de validação: <strong className="break-all">{acao.codigoValidacao}</strong></p></div>}
    {usuario && <HistoricoMissao key={usuario.idUsuario} idUsuario={usuario.idUsuario} idMissao={missao.idMissao} novaAcao={acao} />}
    {erro && <p role="alert" className="text-red-300">{erro}</p>}
  </section>;
}
