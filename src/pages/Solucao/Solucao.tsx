import Passo from '../../components/Passo/Passo'
import { useNavigate } from 'react-router-dom'

function Solucao() {
  const navigate = useNavigate()

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
          Como funciona o SoulPass?
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
          O SoulPass transforma a mobilidade urbana em uma experiência
          inteligente e sustentável, incentivando escolhas conscientes por
          meio de tecnologia, gamificação e recompensas.
        </p>
      </section>

      {/* Problema */}
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
          O Problema
        </h2>

        <div className="space-y-4 text-base leading-relaxed text-white/90 md:text-lg">
          <p>
            Grandes cidades enfrentam problemas crescentes de mobilidade
            urbana, com trânsito intenso e altos níveis de poluição causados
            pelo uso excessivo de transportes individuais.
          </p>

          <p>
            A falta de incentivos práticos dificulta a adoção de hábitos mais
            sustentáveis, como o uso de transporte público e bicicletas
            compartilhadas pela população.
          </p>
        </div>
      </section>

      {/* Proposta */}
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
          Nossa Proposta
        </h2>

        <div className="space-y-4 text-base leading-relaxed text-white/90 md:text-lg">
          <p>
            O SoulPass transforma mobilidade urbana em uma experiência
            inteligente e sustentável, recompensando usuários por escolhas
            conscientes no transporte diário.
          </p>

          <p>
            Por meio da gamificação e de um sistema de pontos, conectamos
            sustentabilidade e tecnologia em uma experiência prática, acessível
            e adaptada para desktop e mobile.
          </p>
        </div>
      </section>

      {/* Pilares */}
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
          Nossos pilares
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
              Incentivo direto a hábitos sustentáveis no dia a dia.
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
              Tecnologia
            </h3>

            <p className="text-base leading-relaxed text-white">
              Plataforma digital com sistema de pontos e gamificação.
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
              Mobilidade
            </h3>

            <p className="text-base leading-relaxed text-white">
              Estímulo ao uso de transporte público e bicicletas compartilhadas.
            </p>
          </article>
        </div>
      </section>

      {/* Passos */}
      <section className="mx-auto mt-16 max-w-5xl">
        <h2
          className="
            mb-4
            text-2xl
            font-bold
            text-[#6bdcd6]
            md:text-3xl
          "
        >
          Como utilizar o SoulPass?
        </h2>

        <p className="mb-8 text-base text-white/90 md:text-lg">
          Veja como utilizar o SoulPass em quatro passos simples.
        </p>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
          "
        >
          <Passo
            numero={1}
            titulo="Cadastre-se"
            texto="Crie sua conta gratuitamente na plataforma e tenha acesso ao SoulPass."
          />

          <Passo
            numero={2}
            titulo="Acumule Pontos"
            texto="Registre o uso de transporte público, bicicletas compartilhadas e ações sustentáveis."
          />

          <Passo
            numero={3}
            titulo="Troque Recompensas"
            texto="Utilize seu saldo de pontos para resgatar vouchers e benefícios reais."
          />

          <Passo
            numero={4}
            titulo="Use no Dia a Dia"
            texto="Receba um código digital único, válido e pronto para ser utilizado."
          />
        </div>
      </section>

      {/* Benefícios */}
      <section
        className="
          mx-auto
          mt-16
          max-w-5xl
          rounded-2xl
          bg-[#2d2d2d]
          p-6
          md:p-8
        "
      >
        <h2
          className="
            mb-6
            text-2xl
            font-bold
            text-[#6bdcd6]
            md:text-3xl
          "
        >
          Benefícios
        </h2>

        <ul className="space-y-4">
          <li className="text-base leading-relaxed text-white md:text-lg">
            <span className="mr-2 font-bold text-[#6bdcd6]">✓</span>
            Redução do impacto ambiental nas grandes cidades.
          </li>

          <li className="text-base leading-relaxed text-white md:text-lg">
            <span className="mr-2 font-bold text-[#6bdcd6]">✓</span>
            Incentivo ao uso de transporte público e bicicletas compartilhadas.
          </li>

          <li className="text-base leading-relaxed text-white md:text-lg">
            <span className="mr-2 font-bold text-[#6bdcd6]">✓</span>
            Recompensas reais por hábitos sustentáveis.
          </li>

          <li className="text-base leading-relaxed text-white md:text-lg">
            <span className="mr-2 font-bold text-[#6bdcd6]">✓</span>
            Plataforma segura, prática e acessível em qualquer dispositivo.
          </li>
        </ul>
      </section>
        <section className="mx-auto mt-16 max-w-5xl pb-10 text-center">
  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
    Quer fazer parte do SoulPass?
  </h2>

  <p className="mb-6 text-base text-white/90 md:text-lg">
    Comece agora a participar da nossa plataforma.
  </p>

  <div className="flex flex-col justify-center gap-4 sm:flex-row">
    <button
      onClick={() => navigate('/solucao/login')}
      className="
        rounded-xl
        bg-white
        px-6
        py-3
        font-bold
        text-[#1193a0]
        transition
        duration-200
        hover:bg-[#6bdcd6]
      "
    >
      Entrar
    </button>

    <button
      onClick={() => navigate('/solucao/cadastro')}
      className="
        rounded-xl
        bg-[#2d2d2d]
        px-6
        py-3
        font-bold
        text-white
        transition
        duration-200
        hover:bg-[#4d4d4d]
      "
    >
      Criar minha conta
    </button>
    </div>
    </section>
    </div>
  )
}

export default Solucao