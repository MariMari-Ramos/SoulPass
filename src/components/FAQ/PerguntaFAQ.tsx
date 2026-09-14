import { useState } from 'react'

interface PerguntaFAQProps {
  pergunta: string
  resposta: string
}

function PerguntaFAQ({ pergunta, resposta }: PerguntaFAQProps) {
  const [aberta, setAberta] = useState(false)

  return (
    <article className="overflow-hidden rounded-2xl bg-[#2d2d2d]">
      <h3>
        <button
          type="button"
          onClick={() => setAberta(!aberta)}
          aria-expanded={aberta}
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
          "
        >
          <span className="min-w-0">{pergunta}</span>

          <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-[#6bdcd6]">
            +
          </span>
        </button>
      </h3>

      {aberta && (
        <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-white/90">
          {resposta}
        </div>
      )}
    </article>
  )
}

export default PerguntaFAQ