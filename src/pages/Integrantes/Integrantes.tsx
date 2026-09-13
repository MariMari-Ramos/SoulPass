import { useEffect } from 'react'
import CardIntegrante from '../../components/CardIntegrante/CardIntegrante'
import { integrantes } from '../../data/integrantes'

function Integrantes() {
  useEffect(() => {
    const tituloAnterior = document.title

    document.title = 'SoulPass | Integrantes'

    return () => {
      document.title = tituloAnterior
    }
  }, [])

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16">

      <section className="mx-auto max-w-5xl text-center">
        <h1
          className="
            mb-6
            text-3xl
            font-bold
            text-black
            md:text-4xl
          "
        >
          Integrantes
        </h1>

        <p
          className="
            mx-auto
            max-w-3xl
            text-base
            leading-relaxed
            text-black/80
            md:text-lg
          "
        >
          Conheça a equipe responsável pelo desenvolvimento do SoulPass.
        </p>
      </section>

      <section
        className="
          mx-auto
          mt-8
          grid
          max-w-5xl
          grid-cols-1
          gap-5
          sm:mt-12
          sm:gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {integrantes.map((integrante) => (
          <CardIntegrante
            key={integrante.id}
            id={integrante.id}
            nome={integrante.nome}
            foto={integrante.foto}
            rm={integrante.rm}
            turma={integrante.turma}
            github={integrante.github}
            linkedin={integrante.linkedin}
          />
        ))}
      </section>

    </div>
  )
}

export default Integrantes
