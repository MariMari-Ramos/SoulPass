import { useEffect } from 'react'

function Sobre() {
  useEffect(() => {
    const tituloAnterior = document.title

    document.title = 'SoulPass | Sobre'

    return () => {
      document.title = tituloAnterior
    }
  }, [])

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16">
    </div>
  )
}

export default Sobre
