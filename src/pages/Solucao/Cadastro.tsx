import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface CadastroForm {
  nome: string
  email: string
  senha: string
  confirmarSenha: string
}

function Cadastro() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CadastroForm>()

  const onSubmit = (data: CadastroForm) => {
    console.log(data)
    navigate('/solucao/feed')
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl bg-[#2d2d2d] p-8 shadow-xl">

        <h1 className="mb-3 text-center text-3xl font-bold text-white">
          Criar minha conta
        </h1>

        <p className="mb-8 text-center text-white/80">
          Cadastre-se para começar a utilizar o SoulPass.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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
              htmlFor="senha"
              className="mb-2 block font-semibold text-white"
            >
              Senha
            </label>

            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              {...register('senha', {
                required: 'A senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres',
                },
              })}
              className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#2d2d2d] outline-none focus:ring-2 focus:ring-[#6bdcd6]"
            />

            {errors.senha && (
              <p className="mt-2 text-sm text-red-300">
                {errors.senha.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmarSenha"
              className="mb-2 block font-semibold text-white"
            >
              Confirmar senha
            </label>

            <input
              id="confirmarSenha"
              type="password"
              placeholder="Digite sua senha novamente"
              {...register('confirmarSenha', {
                required: 'Confirme sua senha',
                validate: (value) =>
                  value === getValues('senha') ||
                  'As senhas não coincidem',
              })}
              className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#2d2d2d] outline-none focus:ring-2 focus:ring-[#6bdcd6]"
            />

            {errors.confirmarSenha && (
              <p className="mt-2 text-sm text-red-300">
                {errors.confirmarSenha.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-6 py-3 font-bold text-[#1193a0] transition duration-200 hover:bg-[#6bdcd6]"
          >
            Criar conta
          </button>

          <div className="pt-2 text-center">
            <p className="text-sm text-white/80">
              Já possui uma conta?
            </p>

            <button
              type="button"
              onClick={() => navigate('/solucao/login')}
              className="mt-2 font-bold text-[#6bdcd6] hover:underline"
            >
              Entrar
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Cadastro