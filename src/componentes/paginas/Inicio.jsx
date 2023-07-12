import { Link } from 'react-router-dom'

import '../../styles/inicio.sass'

const Inicio = () => {
  return (
    <div id='Inicio'>
        <Link to="/unhealthy-restaurant/Home"><img src="/img/logotipo.png" alt="Logotipo" /></Link>
    </div>
  )
}

export default Inicio