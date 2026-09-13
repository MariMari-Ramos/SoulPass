import { Link } from 'react-router-dom'
import mulherCelular from '../../assets/images/mulhercelular-image.png'

function HeroSection() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-r from-[#1193a0] to-[#2db7ba] text-white">
      <div className="relative z-10 flex min-h-[600px] items-center px-8 py-12">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold">
            SoulPass
          </h1>

          <p className="mb-4 text-xl leading-relaxed">
            Plataforma digital que incentiva a mobilidade urbana sustentável
            por meio da tecnologia e da gamificação.
          </p>

          <p className="mb-4 text-xl leading-relaxed">
            Usuários que utilizam transporte público, bicicletas compartilhadas
            e outras alternativas de baixo impacto ambiental são recompensados
            com pontos e benefícios reais.
          </p>

          <p className="mb-8 text-xl leading-relaxed">
            Conectamos inovação tecnológica e responsabilidade ambiental para
            construir cidades mais inteligentes e acessíveis.
          </p>

          <Link
            to="/sobre"
            className="inline-flex rounded-2xl bg-white px-6 py-3 font-medium text-[#1193a0] transition hover:opacity-90"
          >
            Saiba Mais
          </Link>
        </div>
      </div>

      <img
        src={mulherCelular}
        alt="Pessoa usando o celular"
        className="absolute bottom-0 right-0 h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />
    </section>
  )
}

export default HeroSection