import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout/MainLayout'
import Home from '../pages/Home'
import Sobre from '../pages/Sobre/Sobre'
import Integrantes from '../pages/Integrantes/Integrantes'
import IntegranteDetalhe from '../pages/Integrantes/IntegranteDetalhe'

import Solucao from '../pages/Solucao/Solucao'
import Login from '../pages/Solucao/Login'
import Cadastro from '../pages/Solucao/Cadastro'
import Feed from '../pages/Solucao/Feed'
import Perfil from '../pages/Solucao/Perfil'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/sobre"
            element={<Sobre />}
          />

          <Route
            path="/faq"
            element={<h1>FAQ</h1>}
          />

          <Route
            path="/contato"
            element={<h1>Contato</h1>}
          />

          <Route
            path="/integrantes"
            element={<Integrantes />}
          />

          <Route
            path="/integrantes/:id"
            element={<IntegranteDetalhe />}
          />

          <Route 
            path="/solucao" 
            element={<Solucao />} 
          />
          <Route 
            path="/solucao/login"
             element={<Login />} 
          />
          <Route 
            path="/solucao/cadastro" 
            element={<Cadastro />} 
          />
          <Route 
            path="/solucao/feed"
            element={<Feed />} 
          />
          <Route 
            path="/solucao/perfil" 
            element={<Perfil />} 
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes