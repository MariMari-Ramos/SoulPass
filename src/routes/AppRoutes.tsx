import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import Sobre from "../pages/Sobre/Sobre";
import Integrantes from "../pages/Integrantes/Integrantes";
import IntegranteDetalhe from "../pages/Integrantes/IntegranteDetalhe";

import Solucao from "../pages/Solucao/Solucao";
import Login from "../pages/Solucao/Login";
import Cadastro from "../pages/Solucao/Cadastro";
import Feed from "../pages/Solucao/Feed";
import MissaoDetalhe from "../pages/Solucao/MissaoDetalhe";
import Contato from "../pages/Contato/Contato";
import Faq from "../pages/FAQ/Faq";
import CatalogoVouchers from "../pages/Solucao/CatalogoVouchers";
import NaoEncontrada from "../pages/NaoEncontrada/NaoEncontrada";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/sobre" element={<Sobre />} />

          <Route path="/faq" element={<Faq />} />

          <Route path="/contato" element={<Contato />} />

          <Route path="/integrantes" element={<Integrantes />} />

          <Route path="/integrantes/:id" element={<IntegranteDetalhe />} />

          <Route path="/solucao" element={<Solucao />} />
          <Route path="/solucao/login" element={<Login />} />
          <Route path="/solucao/cadastro" element={<Cadastro />} />
          <Route path="/solucao/feed" element={<Feed />} />
          <Route path="/solucao/missoes/:id" element={<MissaoDetalhe />} />
          <Route
            path="/solucao/vouchers"
            element={
              <CatalogoVouchers
                idUsuario={0}
                saldoPontos={0}
                onResgateConcluido={() => {}}
              />
            }
          />

          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
