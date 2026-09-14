import { Link } from 'react-router-dom'

function Header() {
  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-end
        gap-2
        bg-black/30
        px-3
        pl-16
        md:h-20
        md:gap-4
        md:px-8
      "
    >
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          to="/solucao/login"
          className="
            rounded-lg
            bg-white
            px-3
            py-2
            text-sm
            font-semibold
            text-[#1193a0]
            transition
            duration-200
            hover:bg-[#6bdcd6]
            md:px-5
            md:text-base
          "
        >
          Entrar
        </Link>

        <Link
          to="/solucao/cadastro"
          className="
            rounded-lg
            bg-[#1193a0]
            px-3
            py-2
            text-sm
            font-semibold
            text-white
            transition
            duration-200
            hover:bg-[#2db7ba]
            md:px-5
            md:text-base
          "
        >
          Criar conta
        </Link>
      </div>
    </header>
  )
}

export default Header