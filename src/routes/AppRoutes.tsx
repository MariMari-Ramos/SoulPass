import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout/MainLayout'
import Home from '../pages/Home'

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
            element={<h1>Sobre</h1>}
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
            element={<h1>Integrantes</h1>}
          />

          <Route
            path="/solucao"
            element={<h1>Solução</h1>}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes