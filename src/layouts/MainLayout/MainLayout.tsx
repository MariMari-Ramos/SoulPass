import { Outlet } from 'react-router-dom'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Footer from '../../components/Footer/Footer'

function MainLayout() {
  return (
    <div className="min-h-screen">

      <Sidebar />

      <div className="flex min-h-screen flex-col md:ml-20">

        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  )
}

export default MainLayout