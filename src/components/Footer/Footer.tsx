import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="
      bg-[#4d4d4d]
      text-white
      px-6
      py-8
      md:px-10
      lg:px-16
    ">

      <div className="
        flex
        justify-between
        gap-8
        flex-wrap
      ">

        <section className="max-w-xs">
          <h3 className="text-xl font-bold mb-4">
            SoulPass
          </h3>

          <p className="text-base">
            Uma solução para melhorar a experiência
            no transporte público.
          </p>
        </section>

        <section className="max-w-xs">
          <h3 className="text-xl font-bold mb-4">
            Links
          </h3>

          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="hover:underline">
                Início
              </Link>
            </li>

            <li>
              <Link to="/sobre" className="hover:underline">
                Sobre
              </Link>
            </li>

            <li>
              <Link to="/integrantes" className="hover:underline">
                Integrantes
              </Link>
            </li>

            <li>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/contato" className="hover:underline">
                Contato
              </Link>
            </li>
          </ul>
        </section>

        <section className="max-w-xs">
          <h3 className="text-xl font-bold mb-4">
            Contato
          </h3>

          <p className="text-base">
            Entre em contato conosco para saber mais
            sobre o projeto.
          </p>
        </section>

      </div>

      <div className="
        mt-8
        pt-6
        border-t
        border-gray-300
        text-center
      ">
        <p className="text-sm">
          © 2026 SoulPass. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  )
}

export default Footer