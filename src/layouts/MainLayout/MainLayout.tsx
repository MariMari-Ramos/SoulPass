import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Footer from '../../components/Footer/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">

      <Sidebar />

      <div className="flex min-h-screen flex-col md:ml-20">

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  )
}

export default MainLayout