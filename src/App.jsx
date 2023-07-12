import { Link } from 'react-router-dom'
import './styles/app.sass'

function App() {
  
  return (
   <div>
    <div id='Healthy'>
      <h1>Healthy</h1>
      <Link to="/Healthy" className='link'>Abrir Menu</Link>
      <Link to="/GerirPedidos" className='VerPedidos link'>Ver pedidos</Link>
      
    </div>
    <div id='Unhealthy'>
      <h1>Unhealthy</h1>
      <Link to="/Unhealthy" className='link'>Abrir Menu</Link>
      <Link to="/GerirPedidos" className='VerPedidos link'>Ver pedidos</Link>
    </div>
   </div>
   
  )
}

export default App
