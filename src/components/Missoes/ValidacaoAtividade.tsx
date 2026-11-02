import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { AcaoRealizada } from '../../types/api';
import { aprovarAcao } from '../../services/acaoService';
import { botaoMissao, campoMissao, mensagemErro } from './consultaUtils';

export default function ValidacaoAtividade({ acao, aoAtualizar }: { acao: AcaoRealizada; aoAtualizar: (acao?: AcaoRealizada, erro?: string) => void }) {
  const bloqueio = useRef(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ codigo: string }>();
  const aprovar = async ({ codigo }: { codigo: string }) => {
    if (bloqueio.current || acao.statusAprovacao !== 'PENDENTE') return;
    bloqueio.current = true;
    try { aoAtualizar(await aprovarAcao(acao.idAcao, codigo.trim())); }
    catch (erro) {
      // Uma falha de rede pode ocorrer depois de o Java efetivar a aprovação.
      aoAtualizar(undefined, mensagemErro(erro));
    } finally { bloqueio.current = false; }
  };
  return <article className="min-w-0 space-y-3 rounded-xl border border-white/25 p-4">
    <h3 className="font-bold">Atividade #{acao.idAcao}</h3>
    <p>Método: {acao.metodoValidacao}</p>
    <p role="status" className="font-semibold">Status: {acao.statusAprovacao}</p>
    {acao.statusAprovacao === 'APROVADO'
      ? <p className="text-[#6bdcd6]">{acao.pontosConquistados} pontos conquistados</p>
      : <p>{acao.statusAprovacao === 'REJEITADO' ? 'Atividade rejeitada. Nenhum ponto concedido.' : 'Aguardando validação. Nenhum ponto concedido.'}</p>}
    {acao.statusAprovacao === 'PENDENTE' && <>
      <p>Código de validação: <strong className="break-all">{acao.codigoValidacao}</strong></p>
      <form onSubmit={event => { void handleSubmit(aprovar)(event); }} className="space-y-3">
        <label className="block" htmlFor={`codigo-${acao.idAcao}`}>Digite o código para validar</label>
        <input id={`codigo-${acao.idAcao}`} className={campoMissao} autoComplete="off" spellCheck={false} aria-invalid={!!errors.codigo} aria-describedby={`codigo-erro-${acao.idAcao}`}
          {...register('codigo', { validate: valor => valor.trim().length > 0 || 'Informe o código de validação.' })} />
        <p id={`codigo-erro-${acao.idAcao}`} className="text-red-300">{errors.codigo?.message}</p>
        <p className="text-sm text-white/80">Confira antes de enviar: um código incorreto pode rejeitar a atividade.</p>
        <button className={botaoMissao} disabled={isSubmitting}>{isSubmitting ? 'Validando…' : 'Validar atividade'}</button>
      </form>
    </>}
  </article>;
}
