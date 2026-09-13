import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Sobre() {
  useEffect(() => {
    const tituloAnterior = document.title

    document.title = 'SoulPass | Sobre'

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
            text-white
            md:text-4xl
          "
        >
          Sobre o SoulPass
        </h1>

        <p
          className="
            mx-auto
            max-w-3xl
            text-base
            leading-relaxed
            text-white/90
            md:text-lg
          "
        >
          O SoulPass nasceu como um projeto acadêmico com o propósito de unir
          tecnologia e sustentabilidade, incentivando escolhas de mobilidade
          urbana mais conscientes através da gamificação.
        </p>
      </section>

      {/* Missão */}
      <section className="mx-auto mt-12 max-w-5xl">
        <h2
          className="
            mb-4
            text-2xl
            font-bold
            text-[#6bdcd6]
            md:text-3xl
          "
        >
          Nossa Missão
        </h2>

        <div className="space-y-4 text-base leading-relaxed text-white/90 md:text-lg">
          <p>
            Acreditamos que pequenas mudanças de comportamento, quando
            multiplicadas por milhares de pessoas, transformam cidades.
            Por isso, criamos uma plataforma que recompensa quem escolhe
            transporte público, bicicleta ou caminhada no dia a dia.
          </p>

          <p>
            Mais do que um aplicativo de pontos, o SoulPass é um convite para
            repensar a forma como nos movemos pela cidade, tornando esse
            processo simples, acessível e divertido.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto mt-12 max-w-5xl">
        <h2
          className="
            mb-6
            text-2xl
            font-bold
            text-[#6bdcd6]
            md:text-3xl
          "
        >
          Nossos Valores
        </h2>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-3
          "
        >
          <article
            className="
              rounded-2xl
              bg-[#2d2d2d]
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <h3 className="mb-3 text-xl font-bold text-[#6bdcd6]">
              Sustentabilidade
            </h3>

            <p className="text-base leading-relaxed text-white">
              Cada escolha de transporte consciente conta para um futuro mais
              limpo.
            </p>
          </article>

          <article
            className="
              rounded-2xl
              bg-[#2d2d2d]
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <h3 className="mb-3 text-xl font-bold text-[#6bdcd6]">
              Transparência
            </h3>

            <p className="text-base leading-relaxed text-white">
              Regras de pontuação e recompensas claras para toda a
              comunidade.
            </p>
          </article>

          <article
            className="
              rounded-2xl
              bg-[#2d2d2d]
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <h3 className="mb-3 text-xl font-bold text-[#6bdcd6]">
              Comunidade
            </h3>

            <p className="text-base leading-relaxed text-white">
              Um projeto feito por estudantes, pensado para pessoas reais.
            </p>
          </article>
        </div>
      </section>

      {/* CTA para equipe */}
      <section className="mx-auto mt-16 max-w-5xl pb-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Conheça quem está por trás do projeto
        </h2>

        <p className="mb-6 text-base text-white/90 md:text-lg">
          Veja os integrantes responsáveis pelo desenvolvimento do SoulPass.
        </p>

        <Link
          to="/integrantes"
          className="
            inline-flex
            rounded-xl
            bg-[#1193a0]
            px-6
            py-3
            font-bold
            text-white
            transition
            duration-200
            hover:bg-[#2db7ba]
          "
        >
          Ver Integrantes
        </Link>
      </section>

    </div>
  )
}

export default Sobre
