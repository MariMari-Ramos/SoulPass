import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PerguntaFAQ from '../../components/FAQ/PerguntaFAQ'

interface ItemFAQ {
  id: number
  pergunta: string
  resposta: string
}

const perguntas: ItemFAQ[] = [
  {
    id: 1,
    pergunta: 'O que é o SoulPass?',
    resposta:
      'O SoulPass é uma plataforma digital que recompensa usuários por escolherem meios de transporte sustentáveis, como transporte público e bicicletas compartilhadas.',
  },
  {
    id: 2,
    pergunta: 'Como ganho pontos?',
    resposta:
      'Você acumula pontos ao registrar viagens em transporte público, utilizar bicicletas compartilhadas e participar de ações de conscientização ambiental dentro da plataforma.',
  },
  {
    id: 3,
    pergunta: 'Como uso minhas recompensas?',
    resposta:
      'Após acumular pontos, basta acessar a plataforma e trocar seu saldo por vouchers digitais de transporte e outros benefícios disponíveis.',
  },
  {
    id: 4,
    pergunta: 'Os vouchers têm validade?',
    resposta:
      'Sim. Cada voucher possui validade limitada e uso único, garantindo mais segurança e confiabilidade na utilização do benefício.',
  },
  {
    id: 5,
    pergunta: 'O serviço tem custo?',
    resposta:
      'Não. O cadastro na plataforma e o acúmulo de pontos são totalmente gratuitos para o usuário.',
  },
]

function Faq() {
  const navigate = useNavigate()

  // guarda o id da pergunta aberta; null = todas fechadas
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null)

  useEffect(() => {
    const tituloAnterior = document.title

    document.title = 'SoulPass | FAQ'

    return () => {
      document.title = tituloAnterior
    }
  }, [])

  const alternarPergunta = (id: number) => {
    setPerguntaAberta((atual) => (atual === id ? null : id))
  }

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16">

      <section className="mx-auto max-w-5xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Perguntas Frequentes
        </h1>

        <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
          Tire suas dúvidas sobre o funcionamento do SoulPass.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-3xl">
        <div className="space-y-4">
          {perguntas.map((item) => (
            <PerguntaFAQ
              key={item.id}
              id={item.id}
              pergunta={item.pergunta}
              resposta={item.resposta}
              aberta={perguntaAberta === item.id}
              onAlternar={alternarPergunta}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl pb-10 text-center">
        <h2 className="mb-3 text-xl font-bold text-white md:text-2xl">
          Não encontrou o que procurava?
        </h2>

        <p className="mb-6 text-base text-white/90">
          Envie sua dúvida para a nossa equipe e respondemos por e-mail.
        </p>

        <button
          type="button"
          onClick={() => navigate('/contato')}
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
          Falar com a equipe
        </button>
      </section>

    </div>
  )
}

export default Faq