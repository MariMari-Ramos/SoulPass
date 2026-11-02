export const botaoMissao = 'inline-flex min-h-11 items-center justify-center rounded-xl bg-[#6bdcd6] px-5 py-3 font-bold text-[#163534] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60';
export const campoMissao = 'w-full rounded-xl border border-white/30 bg-[#202020] px-4 py-3 text-white focus-visible:outline-2 focus-visible:outline-[#6bdcd6]';

export function mensagemErro(erro: unknown) {
  return erro instanceof Error ? erro.message : 'Não foi possível concluir a solicitação. Tente novamente.';
}

