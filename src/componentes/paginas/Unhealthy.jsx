import { useEffect, useState}from 'react'
import { Link } from 'react-router-dom'

import { MdOutlineChangeCircle } from 'react-icons/md'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

import '../../styles/paginas_menus.sass'
import bd from '../../../bd.json'
const Unhealthy = () => {
   
    const [Menu, setMenu] = useState([])
    const [showLista, setShowLista] = useState([])

    const toggleList = (index) => {
      setShowLista((prev) => {
        const newState = [...prev]
        newState[index] = !newState[index]
        return newState
      })
    }

    useEffect(() => {
      setMenu(bd.Menus.Healthy)
      setShowLista(new Array(bd.Menus.Healthy.length).fill(false))
    }, [])  

  return (
    <div id='Menu'>
      <header>
        <h1>Menu Unhealthy <Link to="/unhealthy-restaurant/Healthy"> <MdOutlineChangeCircle/></Link></h1>
        <Link to="/unhealthy-restaurant/FazerPedido" className='link' id='LinkPedido'><button id='Pedidobtn'>Fazer Pedido</button></Link>
        <Link to="/unhealthy-restaurant/Home" className='Voltar'>Voltar</Link>
      </header>
      <main>
        <div>
          {Menu.map((category, index) => (
            <div key={index}>
              <h2>{Object.keys(category)[0]}
                <span>
                  {showLista[index] ? 
                    (<AiOutlineMinusCircle onClick={() => toggleList(index)} />) : 
                    (<AiOutlinePlusCircle onClick={() => toggleList(index)} />)
                  }
                </span>
              </h2>
              {showLista[index] && (
                <ul>
                  {category[Object.keys(category)[0]].map((product, index) => (
                    <li key={index}>
                      <div id='Li'>
                        {product.Nome} <span>{product.Preço.toFixed(2)}€</span>
                      </div>
                      {product.Descrição && <p id='Descricao'>({product.Descrição})</p>}
                    </li>
                  ))}
                </ul> 
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Unhealthy