import { useEffect } from 'react'
import HeroSection from '../components/Home/HeroSection'

function Home() {
  useEffect(() => {
    const tituloAnterior = document.title

    document.title = 'SoulPass | Início'

    return () => {
      document.title = tituloAnterior
    }
  }, [])

  return (
    <HeroSection />
  )
}

export default Home