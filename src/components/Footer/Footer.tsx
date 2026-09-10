function Footer() {
  return (
    <footer className="
      bg-[#4d4d4d]
      text-white
      px-8
      py-8
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
              <a href="/" className="hover:underline">
                Início
              </a>
            </li>

            <li>
              <a href="/sobre" className="hover:underline">
                Sobre
              </a>
            </li>

            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>

            <li>
              <a href="/contato" className="hover:underline">
                Contato
              </a>
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