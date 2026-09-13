import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { integrantes } from '../../data/integrantes'

function IntegranteDetalhe() {
  const { id } = useParams<{ id: string }>()
  const integrante = integrantes.find((item) => item.id === id)

  useEffect(() => {
    const tituloAnterior = document.title

    document.title = integrante
      ? `SoulPass | ${integrante.nome}`
      : 'SoulPass | Integrante não encontrado'

    return () => {
      document.title = tituloAnterior
    }
  }, [integrante])

  if (!integrante) {
    return (
      <div className="px-6 py-10 text-center md:px-10 lg:px-16">
        <h1 className="mb-4 text-2xl font-bold text-white">
          Integrante não encontrado
        </h1>

        <Link
          to="/integrantes"
          className="font-semibold text-[#6bdcd6] hover:underline"
        >
          ← Voltar para Integrantes
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16">

      <Link
        to="/integrantes"
        className="mb-8 inline-block font-semibold text-[#6bdcd6] hover:underline"
      >
        ← Voltar para Integrantes
      </Link>

      <section
        className="
          mx-auto
          flex
          max-w-2xl
          flex-col
          items-center
          rounded-2xl
          bg-[#2d2d2d]
          p-8
          text-center
        "
      >
        <img
          src={integrante.foto}
          alt={`Foto de ${integrante.nome}`}
          className="
            mb-5
            h-32
            w-32
            rounded-full
            border-4
            border-[#1193a0]
            object-cover
          "
        />

        <h1 className="text-2xl font-bold text-white md:text-3xl">
          {integrante.nome}
        </h1>

        <p className="mt-2 text-base text-white/70">
          RM {integrante.rm} · {integrante.turma}
        </p>

        <div className="mt-6 flex items-center gap-6">
          <a
            href={integrante.github}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#6bdcd6] hover:underline"
          >
            GitHub
          </a>

          <a
            href={integrante.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#6bdcd6] hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </section>

    </div>
  )
}

export default IntegranteDetalhe
