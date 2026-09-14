interface PerguntaFAQProps {
  id: number
  pergunta: string
  resposta: string
  aberta: boolean
  onAlternar: (id: number) => void
}

function PerguntaFAQ({
  id,
  pergunta,
  resposta,
  aberta,
  onAlternar,
}: PerguntaFAQProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-[#2d2d2d]">
      <h3>
        <button
          type="button"
          onClick={() => onAlternar(id)}
          aria-expanded={aberta}
          aria-controls={`resposta-${id}`}
          className="
            flex
            w-full
            items-center
            justify-between
            gap-4
            px-5
            py-4
            text-left
            text-base
            font-bold
            text-white
            transition
            duration-200
            hover:bg-[#4d4d4d]
            md:px-6
            md:text-lg
          "
        >
          <span className="min-w-0">{pergunta}</span>

          <span
            aria-hidden="true"
            className={`
              shrink-0
              text-2xl
              leading-none
              text-[#6bdcd6]
              transition-transform
              duration-300
              ${aberta ? 'rotate-45' : 'rotate-0'}
            `}
          >
            +
          </span>
        </button>
      </h3>

      {aberta && (
        <div
          id={`resposta-${id}`}
          className="
            border-t
            border-white/10
            px-5
            py-4
            text-sm
            leading-relaxed
            text-white/90
            md:px-6
            md:text-base
          "
        >
          {resposta}
        </div>
      )}
    </article>
  )
}

export default PerguntaFAQ