function Header() {
  return (
    <header
      className="
        h-20
        bg-black/30
        flex
        items-center
        justify-end
        gap-4
        px-8
      "
    >
      <div className="flex items-center gap-4">

        <button
          className="
            rounded-lg
            bg-white
            px-5
            py-2
            font-semibold
            text-[#1193a0]
            transition
            duration-200
            hover:bg-[#6bdcd6]
          "
        >
          Configurações
        </button>

        <button
          className="
            rounded-lg
            bg-[#1193a0]
            px-5
            py-2
            font-semibold
            text-white
            transition
            duration-200
            hover:bg-[#2db7ba]
          "
        >
          Perfil
        </button>

      </div>
    </header>
  )
}

export default Header