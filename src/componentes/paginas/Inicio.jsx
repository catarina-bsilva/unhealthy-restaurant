import { Link } from 'react-router-dom'
import logo from '../../../dist/img/logotipo.png'
import '../../styles/inicio.sass'

const Inicio = () => {
  return (
    <div id='Inicio'>
        <Link to="/unhealthy-restaurant/Home"><img src={logo} alt="Logotipo" /></Link>
    </div>
  )
}

export default Inicio