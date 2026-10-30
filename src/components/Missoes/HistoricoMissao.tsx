import { useCallback, useState } from 'react';
import type { AcaoRealizada } from '../../types/api';
import { listarAcoesPorUsuario } from '../../services/acaoService';
import { buscarUsuarioPorId } from '../../services/usuarioService';
import { useConsulta } from '../../hooks/useConsulta';
import EstadoConsulta from './EstadoConsulta';
import { botaoMissao } from './consultaUtils';
import ValidacaoAtividade from './ValidacaoAtividade';

export default function HistoricoMissao({ idUsuario, idMissao, novaAcao }: { idUsuario: number; idMissao: number; novaAcao: AcaoRealizada | null }) {
  const consultarAcoes = useCallback(() => listarAcoesPorUsuario(idUsuario), [idUsuario]);
  const consultarSaldo = useCallback(() => buscarUsuarioPorId(idUsuario), [idUsuario]);
  const historico = useConsulta(consultarAcoes, novaAcao);
  const saldo = useConsulta(consultarSaldo, novaAcao);
  const [ultimaResposta, setUltimaResposta] = useState<AcaoRealizada | null>(null);
  const [erroValidacao, setErroValidacao] = useState('');
  const atualizar = (acao?: AcaoRealizada, erro = '') => {
    setErroValidacao(erro);
    if (acao) setUltimaResposta(acao);
    historico.recarregar();
    saldo.recarregar();
  };
  // Preserva a resposta da escrita se a consulta seguinte falhar; o GET bem-sucedido é a fonte final.
  const porId = new Map<number, AcaoRealizada>();
  if (novaAcao) porId.set(novaAcao.idAcao, novaAcao);
  if (ultimaResposta) porId.set(ultimaResposta.idAcao, ultimaResposta);
  historico.dados?.forEach(acao => porId.set(acao.idAcao, acao));
  const acoes = [...porId.values()].filter(acao => acao.idMissao === idMissao).sort((a, b) => b.idAcao - a.idAcao);
  return <section className="space-y-5" aria-labelledby="historico-titulo">
    <h2 id="historico-titulo" className="text-2xl font-bold">Suas atividades nesta missão</h2>
    <EstadoConsulta carregando={saldo.carregando} erro={saldo.erro ? `Não foi possível atualizar o saldo: ${saldo.erro}` : ''} tentarNovamente={saldo.recarregar} />
    {saldo.dados && <p role="status">Saldo confirmado: <strong>{saldo.dados.saldoPontos} pontos</strong> · XP: {saldo.dados.pontosXp}</p>}
    <button type="button" className={botaoMissao} onClick={() => atualizar()} disabled={historico.carregando || saldo.carregando}>Atualizar atividades e saldo</button>
    <EstadoConsulta carregando={historico.carregando} erro={historico.erro} tentarNovamente={historico.recarregar} />
    {!historico.carregando && !historico.erro && acoes.length === 0 && <p>Nenhuma atividade registrada nesta missão para este usuário.</p>}
    {erroValidacao && <p role="alert" className="text-red-300">{erroValidacao}</p>}
    <div className="grid gap-4 md:grid-cols-2">{acoes.map(acao => <ValidacaoAtividade key={`${acao.idAcao}-${acao.statusAprovacao}`} acao={acao} aoAtualizar={atualizar} />)}</div>
  </section>;
}
