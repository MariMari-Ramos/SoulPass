interface PassoProps {
  numero: number
  titulo: string
  texto: string
}

function Passo({ numero, titulo, texto }: PassoProps) {
  return (
    <article
      className="
        flex
        min-w-0
        flex-col
        rounded-2xl
        bg-[#2d2d2d]
        p-5
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        "
    >
      <div
        className="
          mb-4
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-[#6bdcd6]
          text-xl
          font-bold
          text-[#2d2d2d]
        "
      >
        {numero}
      </div>

      <h3
        className="
          mb-2
          text-xl
          font-bold
          text-[#6bdcd6]
        "
      >
        {titulo}
      </h3>

    <p
        className="
        min-w-0
        wrap-break-word
        text-sm
        leading-relaxed
        text-white
        md:text-base
        "
    >
        {texto}
    </p>
    </article>
  )
}

export default Passo