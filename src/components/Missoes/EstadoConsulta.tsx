export const botaoMissao = 'inline-flex min-h-11 items-center justify-center rounded-xl bg-[#6bdcd6] px-5 py-3 font-bold text-[#163534] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60';
export const campoMissao = 'w-full rounded-xl border border-white/30 bg-[#202020] px-4 py-3 text-white focus-visible:outline-2 focus-visible:outline-[#6bdcd6]';

export function mensagemErro(erro: unknown) {
  return erro instanceof Error ? erro.message : 'Não foi possível concluir a solicitação. Tente novamente.';
}

export default function EstadoConsulta({ carregando, erro, vazio, tentarNovamente }: {
  carregando: boolean; erro: string; vazio?: boolean; tentarNovamente: () => void;
}) {
  if (carregando) return <p role="status" className="py-8 text-white/80">Carregando… O servidor pode levar cerca de 50 segundos para iniciar.</p>;
  if (erro) return <div role="alert" className="space-y-4 rounded-xl border border-red-300 p-5"><p>{erro}</p><button type="button" className={botaoMissao} onClick={tentarNovamente}>Tentar novamente</button></div>;
  if (vazio) return <p role="status" className="py-8 text-white/80">Nenhuma missão disponível no momento.</p>;
  return null;
}
