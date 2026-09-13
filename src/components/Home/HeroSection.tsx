import { Link } from 'react-router-dom'
import mulherCelular from '../../assets/images/mulhercelular-image.png'

function HeroSection() {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-gradient-to-r from-[#1193a0] to-[#2db7ba] text-white md:min-h-[560px] lg:min-h-[600px]">

      <div className="relative z-10 flex min-h-[520px] items-center px-5 py-10 sm:px-8 md:min-h-[560px] md:px-10 lg:min-h-[600px] lg:px-12">

        <div className="w-full md:max-w-[55%] lg:max-w-[58%]">
          <h1 className="mb-5 text-3xl font-bold sm:text-4xl lg:mb-6 lg:text-5xl">
            SoulPass
          </h1>

          <p className="mb-4 text-base leading-relaxed sm:text-lg lg:text-xl">
            Plataforma digital que incentiva a mobilidade urbana sustentável
            por meio da tecnologia e da gamificação.
          </p>

          <p className="mb-4 text-base leading-relaxed sm:text-lg lg:text-xl">
            Usuários que utilizam transporte público, bicicletas compartilhadas
            e outras alternativas de baixo impacto ambiental são recompensados
            com pontos e benefícios reais.
          </p>

          <p className="mb-7 text-base leading-relaxed sm:text-lg lg:mb-8 lg:text-xl">
            Conectamos inovação tecnológica e responsabilidade ambiental para
            construir cidades mais inteligentes e acessíveis.
          </p>

          <Link
            to="/sobre"
            className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-medium text-[#1193a0] transition hover:opacity-90 sm:px-6 sm:text-base"
          >
            Saiba Mais
          </Link>
        </div>
      </div>

      <img
        src={mulherCelular}
        alt="Pessoa usando o celular"
        className="absolute bottom-0 right-0 z-0 hidden h-full w-[42%] object-cover object-center md:block lg:w-[40%]"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />
    </section>
  )
}

export default HeroSection