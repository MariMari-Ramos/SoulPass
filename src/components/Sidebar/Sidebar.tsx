function Sidebar() {
  return (
    <aside
      className="
        group
        fixed
        left-0
        top-0
        z-50
        h-screen
        w-20
        bg-[#2d2d2d]
        text-white
        transition-all
        duration-300
        hover:w-50
        flex
        flex-col
        items-center
        py-6
      "
    >

      {/* LOGO */}
      <div className="mb-10 flex justify-center">
        <img
          src="/src/assets/images/SoulUpLogo.png"
          alt="Logo SoulPass"
          className="h-12 w-12 object-contain"
        />
      </div>


      {/* MENU PRINCIPAL */}
      <nav className="flex-1 w-full">

        <ul className="flex flex-col gap-4">

          {/* INÍCIO */}
          <li>
            <a
              href="/"
              className="
                flex
                items-center
                justify-center
                gap-3
                px-4
                py-2
                group-hover:justify-start
              "
            >
              <img
                src="/src/assets/icons/home.png"
                alt=""
                className="h-7 w-7 shrink-0"
              />

              <span
                className="
                  hidden
                  whitespace-nowrap
                  group-hover:block
                "
              >
                Início
              </span>
            </a>
          </li>


          {/* QUEM SOMOS */}
          <li>
            <a
              href="/sobre"
              className="
                flex
                items-center
                justify-center
                gap-3
                px-4
                py-2
                group-hover:justify-start
              "
            >
              <img
                src="/src/assets/icons/users-alt.png"
                alt=""
                className="h-7 w-7 shrink-0"
              />

              <span
                className="
                  hidden
                  whitespace-nowrap
                  group-hover:block
                "
              >
                Quem Somos
              </span>
            </a>
          </li>


          {/* SOBRE */}
          <li>
            <a
              href="/sobre"
              className="
                flex
                items-center
                justify-center
                gap-3
                px-4
                py-2
                group-hover:justify-start
              "
            >
              <img
                src="/src/assets/icons/circle-i.png"
                alt=""
                className="h-7 w-7 shrink-0"
              />

              <span
                className="
                  hidden
                  whitespace-nowrap
                  group-hover:block
                "
              >
                Sobre
              </span>
            </a>
          </li>


          {/* FAQ */}
          <li>
            <a
              href="/faq"
              className="
                flex
                items-center
                justify-center
                gap-3
                px-4
                py-2
                group-hover:justify-start
              "
            >
              <img
                src="/src/assets/icons/search.png"
                alt=""
                className="h-7 w-7 shrink-0"
              />

              <span
                className="
                  hidden
                  whitespace-nowrap
                  group-hover:block
                "
              >
                FAQ
              </span>
            </a>
          </li>


          {/* CONTATO */}
          <li>
            <a
              href="/contato"
              className="
                flex
                items-center
                justify-center
                gap-3
                px-4
                py-2
                group-hover:justify-start
              "
            >
              <img
                src="/src/assets/icons/phone-flip.png"
                alt=""
                className="h-7 w-7 shrink-0"
              />

              <span
                className="
                  hidden
                  whitespace-nowrap
                  group-hover:block
                "
              >
                Contato
              </span>
            </a>
          </li>

        </ul>

      </nav>


      {/* MENU INFERIOR */}
      <div className="w-full">

        <ul className="flex flex-col gap-4">

          {/* CONFIGURAÇÕES */}
          <li>
            <button
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                px-4
                py-2
                text-white
                group-hover:justify-start
              "
            >
              <img
                src="/src/assets/icons/settings.png"
                alt=""
                className="h-7 w-7 shrink-0"
              />

              <span
                className="
                  hidden
                  whitespace-nowrap
                  group-hover:block
                "
              >
                Configurações
              </span>
            </button>
          </li>


          {/* PERFIL */}
          <li>
            <button
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                px-4
                py-2
                text-white
                group-hover:justify-start
              "
            >
              <img
                src="/src/assets/icons/circle-user.png"
                alt=""
                className="h-7 w-7 shrink-0"
              />

              <span
                className="
                  hidden
                  whitespace-nowrap
                  group-hover:block
                "
              >
                Perfil
              </span>
            </button>
          </li>

        </ul>

      </div>

    </aside>
  )
}

export default Sidebar