import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import Inicio from './componentes/paginas/Inicio.jsx'
import Healthy from './componentes/paginas/Healthy.jsx'
import Unhealthy from './componentes/paginas/Unhealthy.jsx'
import Pedidos from './componentes/paginas/Pedidos.jsx'
import Formulario from './componentes/paginas/Formulario.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/Home" element={<App/>}/>
      <Route path="/Healthy" element={<Healthy/>}/>
      <Route path="/Unhealthy" element={<Unhealthy/>}/>
      <Route path="/FazerPedido" element={<Formulario/>}/>
      <Route path="/GerirPedidos" element={<Pedidos/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
