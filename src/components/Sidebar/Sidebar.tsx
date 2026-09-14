import { useState } from 'react'

function Sidebar() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        type="button"
        aria-label="Abrir menu"
        onClick={() => setMenuAberto(true)}
        className="
          fixed
          left-4
          top-3
          z-[60]
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-[#2d2d2d]
          text-2xl
          text-white
          md:hidden
        "
      >
        ☰
      </button>

      {/* FUNDO ESCURO MOBILE */}
      {menuAberto && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            md:hidden
          "
        />
      )}

      {/* SIDEBAR MOBILE */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          bg-[#2d2d2d]
          px-4
          py-6
          text-white
          transition-transform
          duration-300
          md:hidden
          ${menuAberto ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="mb-8 flex items-center justify-between">
          <img
            src="/src/assets/images/SoulUpLogo.png"
            alt="Logo SoulPass"
            className="h-12 w-12 object-contain"
          />

          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuAberto(false)}
            className="text-2xl text-white"
          >
            ×
          </button>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="/"
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/10"
              >
                <img
                  src="/src/assets/icons/home.png"
                  alt=""
                  className="h-7 w-7"
                />
                <span>Início</span>
              </a>
            </li>

            <li>
              <a
                href="/sobre"
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/10"
              >
                <img
                  src="/src/assets/icons/users-alt.png"
                  alt=""
                  className="h-7 w-7"
                />
                <span>Quem Somos</span>
              </a>
            </li>

            <li>
              <a
                href="/sobre"
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/10"
              >
                <img
                  src="/src/assets/icons/circle-i.png"
                  alt=""
                  className="h-7 w-7"
                />
                <span>Sobre</span>
              </a>
            </li>

            <li>
              <a
                href="/faq"
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/10"
              >
                <img
                  src="/src/assets/icons/search.png"
                  alt=""
                  className="h-7 w-7"
                />
                <span>FAQ</span>
              </a>
            </li>

            <li>
              <a
                href="/contato"
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/10"
              >
                <img
                  src="/src/assets/icons/phone-flip.png"
                  alt=""
                  className="h-7 w-7"
                />
                <span>Contato</span>
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <ul className="flex flex-col gap-3">
            <li>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-white/10"
              >
                <img
                  src="/src/assets/icons/settings.png"
                  alt=""
                  className="h-7 w-7"
                />
                <span>Configurações</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-white/10"
              >
                <img
                  src="/src/assets/icons/circle-user.png"
                  alt=""
                  className="h-7 w-7"
                />
                <span>Perfil</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* SIDEBAR DESKTOP */}
      <aside
        className="
          group
          fixed
          left-0
          top-0
          z-50
          hidden
          h-screen
          w-20
          flex-col
          items-center
          bg-[#2d2d2d]
          py-6
          text-white
          transition-all
          duration-300
          hover:w-50
          md:flex
        "
      >
        <div className="mb-10 flex justify-center">
          <img
            src="/src/assets/images/SoulUpLogo.png"
            alt="Logo SoulPass"
            className="h-12 w-12 object-contain"
          />
        </div>

        <nav className="w-full flex-1">
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="/"
                className="flex items-center justify-center gap-3 px-4 py-2 group-hover:justify-start"
              >
                <img
                  src="/src/assets/icons/home.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <span className="hidden whitespace-nowrap group-hover:block">
                  Início
                </span>
              </a>
            </li>

            <li>
              <a
                href="/sobre"
                className="flex items-center justify-center gap-3 px-4 py-2 group-hover:justify-start"
              >
                <img
                  src="/src/assets/icons/users-alt.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <span className="hidden whitespace-nowrap group-hover:block">
                  Quem Somos
                </span>
              </a>
            </li>

            <li>
              <a
                href="/sobre"
                className="flex items-center justify-center gap-3 px-4 py-2 group-hover:justify-start"
              >
                <img
                  src="/src/assets/icons/circle-i.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <span className="hidden whitespace-nowrap group-hover:block">
                  Sobre
                </span>
              </a>
            </li>

            <li>
              <a
                href="/faq"
                className="flex items-center justify-center gap-3 px-4 py-2 group-hover:justify-start"
              >
                <img
                  src="/src/assets/icons/search.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <span className="hidden whitespace-nowrap group-hover:block">
                  FAQ
                </span>
              </a>
            </li>

            <li>
              <a
                href="/contato"
                className="flex items-center justify-center gap-3 px-4 py-2 group-hover:justify-start"
              >
                <img
                  src="/src/assets/icons/phone-flip.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <span className="hidden whitespace-nowrap group-hover:block">
                  Contato
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="w-full">
          <ul className="flex flex-col gap-4">
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 px-4 py-2 text-white group-hover:justify-start"
              >
                <img
                  src="/src/assets/icons/settings.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <span className="hidden whitespace-nowrap group-hover:block">
                  Configurações
                </span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 px-4 py-2 text-white group-hover:justify-start"
              >
                <img
                  src="/src/assets/icons/circle-user.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <span className="hidden whitespace-nowrap group-hover:block">
                  Perfil
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar