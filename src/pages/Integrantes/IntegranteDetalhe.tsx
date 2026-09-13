import { Link } from 'react-router-dom'

function IntegranteDetalhe() {
  return (
    <div className="px-6 py-10 md:px-10 lg:px-16">
      <Link
        to="/integrantes"
        className="mb-8 inline-block font-semibold text-[#6bdcd6] hover:underline"
      >
        ← Voltar para Integrantes
      </Link>
    </div>
  )
}

export default IntegranteDetalhe
