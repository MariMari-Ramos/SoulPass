import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Perfil from "../../pages/Solucao/Perfil";

function MainLayout() {
  const [perfilAberto, setPerfilAberto] = useState(false);
  return (
    <div className="min-h-screen">
      {perfilAberto && <Perfil onFechar={() => setPerfilAberto(false)} />}

      <Sidebar onAbrirPerfil={() => setPerfilAberto(true)} />

      <div className="flex min-h-screen flex-col md:ml-20">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
