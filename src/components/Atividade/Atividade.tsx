interface AtividadeProps {
  titulo: string;
  descricao: string;
  pontos: number;
  onRegistrar: () => void;
}

function Atividade({ titulo, descricao, pontos, onRegistrar }: AtividadeProps) {
  return (
    <article className="rounded-2xl bg-[#2d2d2d] p-5">
      <h3 className="text-lg font-bold text-[#6bdcd6]">{titulo}</h3>

      <p className="mt-2 text-sm leading-relaxed text-white/80">{descricao}</p>

      <p className="mt-4 font-bold text-white">+{pontos} pontos</p>

      <button
        type="button"
        onClick={onRegistrar}
        className="mt-4 w-full rounded-xl bg-white px-4 py-2 font-bold text-[#1193a0] transition hover:bg-[#6bdcd6]"
      >
        Registrar atividade
      </button>
    </article>
  );
}

export default Atividade;
