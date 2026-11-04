# Missões e atividades — Sprint 4

## Escopo e dependência

Branch: `feature/missoes-atividades`. Implementação construída sobre o commit
`3f8f9996771ae565ed473eea738806f27eed5337` do PR #12 do Caio
(`feature/api-arquitetura`), sem alterar ou aprovar esse PR. Os services e tipos
são reutilizados; não há fetch nas páginas nem pontuação calculada no cliente.
Após o merge do #12, atualizar esta branch e direcionar o PR para `main`.

- Feed: `GET /missoes/ativas`, categorias, descrição e pontos potenciais.
- Detalhes: `/solucao/missoes/:id`, `GET /missoes/{id}` e tratamento de ID inválido.
- Registro: `POST /acoes` com `idUsuario`, `idMissao`, `metodoValidacao`.
- Validação: `PUT /acoes/{id}/aprovar` com `{ codigo }`.
- Histórico da missão: `GET /acoes/usuario/{idUsuario}`.
- Saldo e XP: `GET /usuarios/{idUsuario}`, recarregado após as operações.

`CHECKIN`, `QRCODE` e `CODIGO` são enviados literalmente. O código retornado
é exibido em texto, conforme permitido pelo API.md. Não há leitura de câmera,
geolocalização ou geração de imagem QR. HTTP 200 não significa aprovação:
a interface usa `statusAprovacao`. Somente `APROVADO` exibe pontos conquistados.
Atividades rejeitadas não oferecem uma segunda aprovação. Após falha de rede na
aprovação, o histórico é consultado porque a escrita pode ter ocorrido no Java.

## Identificação do usuário: integração pendente

O login da Sprint 3 apenas navega e não identifica uma conta da API. Por isso,
esta entrega inclui seleção explícita por ID de usuário cadastrado, identificada
como demonstração. Não constitui autenticação nem autorização. Não usar um ID
fixo ou atribuir pontos ao primeiro usuário da lista.

O integrante 3 deve conectar a identidade da sessão ao componente
`RegistroAtividade` e substituir a seleção demonstrativa. A API documentada não
possui endpoint de autenticação; não se deve apresentar a seleção como login seguro.
O histórico pode ser recuperado após recarregar a página selecionando novamente
o mesmo usuário. O componente só mostra atividades dessa missão.

## Executar

```sh
npm ci
cp .env.example .env
npm run dev
```

No PowerShell, usar `Copy-Item .env.example .env`. Para backend local, alterar
`VITE_API_URL` para `http://localhost:8080`. Reiniciar o Vite após mudar a variável.
Configurar a mesma variável no deploy. O Render pode demorar cerca de 50 s na
primeira chamada; a tela mantém o carregamento enquanto aguarda.

## Verificação

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Os testes interceptam as requisições com respostas de teste: não criam dados
nem concedem pontos na API publicada. Executam o mesmo fluxo em desktop e celular.
Se necessário em CI, `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` permite usar Chromium
já instalado. As imagens e traces ficam em `test-results/` e não são versionados.

Para validar a integração real, o backend precisa ter uma missão ativa e um
usuário de teste conhecido. Em 30/10/2026, a consulta real de missões ativas
retornou HTTP 200 com `[]`; nenhuma escrita foi feita na API publicada.

Roteiro manual com dados de teste do grupo:

1. Abrir `/solucao/feed`, escolher missão e conferir descrição e pontos.
2. Informar ID de usuário de teste ativo e conferir o saldo inicial.
3. Registrar com cada método; conferir status PENDENTE e ausência de crédito.
4. Informar o código retornado; conferir APROVADO, pontos e saldo atualizado.
5. Em outra atividade, informar código incorreto; conferir REJEITADO e saldo inalterado.
6. Recarregar, selecionar novamente o usuário e verificar o histórico persistido.
7. Testar sem internet, API indisponível, lista vazia e missão inexistente.
8. Conferir navegação por teclado, labels, foco e ausência de rolagem horizontal.

Limitação de rede: uma falha durante POST pode ocorrer depois de a ação ter sido
criada. Consultar/atualizar o histórico antes de repetir o registro; a API não
documenta uma chave de idempotência para POST.
