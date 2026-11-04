import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NaoEncontrada() {
  useEffect(() => {
    const tituloAnterior = document.title

    document.title = 'SoulPass | Página não encontrada'

    return () => {
      document.title = tituloAnterior
    }
  }, [])

  return (
    <div className="px-6 py-10 text-center md:px-10 lg:px-16">
      <h1 className="mb-4 text-3xl font-bold text-black md:text-4xl">
        Página não encontrada
      </h1>

      <p className="mb-6 text-base text-black/80 md:text-lg">
        O endereço que você acessou não existe ou foi removido.
      </p>

      <Link
        to="/"
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
        Voltar para o início
      </Link>
    </div>
  )
}

export default NaoEncontrada
