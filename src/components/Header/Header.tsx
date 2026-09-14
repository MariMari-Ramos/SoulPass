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
        <button
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
          Configurações
        </button>

        <button
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
          Perfil
        </button>
      </div>
    </header>
  )
}

export default Header