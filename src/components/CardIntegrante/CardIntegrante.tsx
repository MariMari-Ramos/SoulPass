import { Link } from 'react-router-dom'

export interface CardIntegranteProps {
  id: string
  nome: string
  foto: string
  rm: string
  turma: string
  github: string
  linkedin: string
}

function CardIntegrante({
  id,
  nome,
  foto,
  rm,
  turma,
  github,
  linkedin,
}: CardIntegranteProps) {
  return (
    <article
      className="
        flex
        flex-col
        items-center
        rounded-2xl
        bg-[#2d2d2d]
        p-6
        text-center
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <img
        src={foto}
        alt={`Foto de ${nome}`}
        className="
          mb-4
          h-28
          w-28
          rounded-full
          border-4
          border-[#1193a0]
          object-cover
        "
      />

      <h3 className="text-xl font-bold text-white">
        {nome}
      </h3>

      <p className="mt-1 text-sm text-white/70">
        RM {rm} · {turma}
      </p>

      <div className="mt-4 flex items-center gap-4">
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          onClick={(evento) => evento.stopPropagation()}
          className="font-semibold text-[#6bdcd6] hover:underline"
        >
          GitHub
        </a>

        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={(evento) => evento.stopPropagation()}
          className="font-semibold text-[#6bdcd6] hover:underline"
        >
          LinkedIn
        </a>
      </div>

      <Link
        to={`/integrantes/${id}`}
        className="
          mt-5
          rounded-xl
          bg-[#1193a0]
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          transition
          duration-200
          hover:bg-[#2db7ba]
        "
      >
        Ver perfil
      </Link>
    </article>
  )
}

export default CardIntegrante
