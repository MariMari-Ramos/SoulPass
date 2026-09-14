import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface ContatoForm {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

function Contato() {
  const navigate = useNavigate()

  const [enviado, setEnviado] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContatoForm>({
    defaultValues: {
      nome: '',
      email: '',
      assunto: '',
      mensagem: '',
    },
  })

  useEffect(() => {
    const tituloAnterior = document.title

    document.title = 'SoulPass | Contato'

    return () => {
      document.title = tituloAnterior
    }
  }, [])

  const onSubmit = (data: ContatoForm) => {
    console.log(data)
    reset()
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-10">
        <section className="w-full max-w-md rounded-2xl bg-[#2d2d2d] p-8 text-center shadow-xl">
          <h1 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Mensagem enviada com sucesso!
          </h1>

          <p className="mb-8 text-base text-white/80">
            Entraremos em contato em breve.
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
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
              Voltar para o início
            </button>

            <button
              type="button"
              onClick={() => setEnviado(false)}
              className="
                rounded-xl
                bg-[#4d4d4d]
                px-6
                py-3
                font-bold
                text-white
                transition
                duration-200
                hover:bg-[#5d5d5d]
              "
            >
              Enviar outra mensagem
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16">

      <section className="mx-auto max-w-5xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Entre em Contato
        </h1>

        <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
          Tem alguma dúvida, sugestão ou quer falar com a gente? Preencha o
          formulário abaixo.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Canais diretos */}
        <aside className="rounded-2xl bg-[#2d2d2d] p-6 lg:col-span-1">
          <h2 className="mb-4 text-xl font-bold text-[#6bdcd6]">
            Outros canais
          </h2>

          <div className="space-y-5 text-base text-white/90">
            <div>
              <p className="text-sm text-white/70">E-mail</p>
              <p className="mt-1 font-bold text-white">contato@soulpass.com</p>
            </div>

            <div>
              <p className="text-sm text-white/70">Telefone</p>
              <p className="mt-1 font-bold text-white">(11) 99999-9999</p>
            </div>

            <div>
              <p className="text-sm text-white/70">Atendimento</p>
              <p className="mt-1 font-bold text-white">
                Segunda a sexta, das 9h às 18h
              </p>
            </div>
          </div>
        </aside>

        {/* Formulário */}
        <div className="rounded-2xl bg-[#2d2d2d] p-6 md:p-8 lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

            <div>
              <label
                htmlFor="nome"
                className="mb-2 block font-semibold text-white"
              >
                Nome
              </label>

              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                {...register('nome', {
                  required: 'O nome é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'O nome deve ter pelo menos 3 caracteres',
                  },
                  maxLength: {
                    value: 80,
                    message: 'O nome deve ter no máximo 80 caracteres',
                  },
                })}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#2d2d2d] outline-none focus:ring-2 focus:ring-[#6bdcd6]"
              />

              {errors.nome && (
                <p className="mt-2 text-sm text-red-300">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-white"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register('email', {
                  required: 'O e-mail é obrigatório',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Digite um e-mail válido',
                  },
                  maxLength: {
                    value: 100,
                    message: 'O e-mail deve ter no máximo 100 caracteres',
                  },
                })}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#2d2d2d] outline-none focus:ring-2 focus:ring-[#6bdcd6]"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-300">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="assunto"
                className="mb-2 block font-semibold text-white"
              >
                Assunto
              </label>

              <input
                id="assunto"
                type="text"
                placeholder="Sobre o que você quer falar?"
                {...register('assunto', {
                  required: 'O assunto é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'O assunto deve ter pelo menos 3 caracteres',
                  },
                  maxLength: {
                    value: 100,
                    message: 'O assunto deve ter no máximo 100 caracteres',
                  },
                })}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#2d2d2d] outline-none focus:ring-2 focus:ring-[#6bdcd6]"
              />

              {errors.assunto && (
                <p className="mt-2 text-sm text-red-300">
                  {errors.assunto.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="mb-2 block font-semibold text-white"
              >
                Mensagem
              </label>

              <textarea
                id="mensagem"
                rows={5}
                placeholder="Escreva sua mensagem"
                {...register('mensagem', {
                  required: 'A mensagem é obrigatória',
                  minLength: {
                    value: 10,
                    message: 'A mensagem deve ter pelo menos 10 caracteres',
                  },
                  maxLength: {
                    value: 500,
                    message: 'A mensagem deve ter no máximo 500 caracteres',
                  },
                })}
                className="w-full resize-y rounded-xl border border-white/20 bg-white px-4 py-3 text-[#2d2d2d] outline-none focus:ring-2 focus:ring-[#6bdcd6]"
              />

              {errors.mensagem && (
                <p className="mt-2 text-sm text-red-300">
                  {errors.mensagem.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                rounded-xl
                bg-white
                px-6
                py-3
                font-bold
                text-[#1193a0]
                transition
                duration-200
                hover:bg-[#6bdcd6]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              Enviar Mensagem
            </button>

          </form>
        </div>

      </section>

    </div>
  )
}

export default Contato