import { useEffect, useState}from 'react'
import { Link } from 'react-router-dom'

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

import '../../styles/paginas_menus.sass'

const Formulario = () => {
    const [MenuHealthy, setMenuHealthy] = useState([])
    const [MenuUnhealthy, setMenuUnhealthy] = useState([])
    const [showListaHealthy, setShowListaHealthy] = useState([])
    const [showListaUnhealthy, setShowListaUnhealthy] = useState([])
    const [ultimoId, setUltimoId] = useState(0)
    const Form = document.getElementById('MyForm')

    const toggleListaHealthy = (index) => {
      setShowListaHealthy((prev) => {
        const newState = [...prev]
        newState[index] = !newState[index]
        return newState
      })
    }

    const toggleListaUnhealthy = (index) => {
      setShowListaUnhealthy((prev) => {
        const newState = [...prev]
        newState[index] = !newState[index]
        return newState
      })
    }

    useEffect(() => {
      const GetMenuUnhealthy = async() => {
        const Req = await fetch ('http://localhost:3000/Menus')
        const Data = await Req.json()

        setMenuUnhealthy(Data.Unhealthy)
        setShowListaUnhealthy(new Array(Data.Unhealthy.length).fill(false))
      }

      GetMenuUnhealthy()
    }, [])

    useEffect(() => {
      const GetMenuHealthy = async() => {
        const Req = await fetch ('http://localhost:3000/Menus')
        const Data = await Req.json()

        setMenuHealthy(Data.Healthy)
        setShowListaHealthy(new Array(Data.Healthy.length).fill(false))
      }

      GetMenuHealthy()
    }, [])

    useEffect(() => {
      const lastId = localStorage.getItem("ultimoId")
      if (lastId) {
        setUltimoId(parseInt(lastId))
      }
    }, [])
    
    useEffect(() => {
      localStorage.setItem("ultimoId", ultimoId.toString())
    }, [ultimoId]);
    
    function gerarProximoId() {
      setUltimoId((prevId) => prevId + 1)
    }

    const postPedido = async (pedido) => {
      const response = await fetch("http://localhost:3000/Pedidos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      })
      if (response.ok) {
        const data = await response.json()
        console.log("Pedido enviado com sucesso!")
      } else {
        onsole.error("Ocorreu um erro ao enviar o pedido.")
      }
    };

    const submitForm = async (event) => {
      event.preventDefault()
      const Mesa = document.getElementById("Mesa").value
      const PedidosEspeciais = document.querySelector("textarea").value
      const proximoId = gerarProximoId()
      const form = event.target
      const inputs = form.querySelectorAll('input[type="number"]')
      const items = []

      inputs.forEach((input) => {
        const quantity = input.value
        const name = input.name
        if (name.includes("Mesa")) {
          return
        }
        if (quantity > 0) {
          const name = input.parentNode.parentNode.innerText.trim()
          items.push(`${quantity}x ${name}`)
        }
      })

      const description = items.join(', ');
      console.log(description)
    
      const pedido = {
        id: proximoId, 
        mesa: Mesa,
        descricao: description,
        pedidosEspeciais: PedidosEspeciais,
        estado: "Pendente",
      }
      
      await postPedido(pedido)

      Form.reset()

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })

      const Mensagem = document.getElementById('MensagemPedido')
      Mensagem.style.display = "block"
      setTimeout(() => {
        Mensagem.style.display = "none"
      }, 2000)
    }

  return (
    <div>
        <header>
            <h1>Fazer Pedido</h1>
            <Link to="/unhealthy-restaurant/Home" className='Voltar'>Voltar</Link>
            <h3 id='MensagemPedido'>Pedido Criado com sucesso</h3>
        </header>
        <main>
            <form onSubmit={submitForm} id='MyForm'>
              <h2 className='Mesah2'>Mesa: <span><input type="number" name="Mesa" id="Mesa" min="1" max="15" required/></span></h2>
              <fieldset>
                <legend>Unhealthy</legend>
                  {MenuUnhealthy.map((category, index) => (
                    <div key={index}>
                      <h2>{Object.keys(category)[0]}<span>
                      {showListaUnhealthy[index] ? 
                        (<AiOutlineMinusCircle onClick={() => toggleListaUnhealthy(index)} />) : 
                        (<AiOutlinePlusCircle onClick={() => toggleListaUnhealthy(index)} />)
                      }
                      </span></h2>
                      {showListaUnhealthy[index] && (
                        <ul>
                          {category[Object.keys(category)[0]].map((product, index) => (
                            <li key={index}>
                              <div id='Li'>
                                {product.Nome} <span><input type="number"  name={product.id} min="0" /></span>
                              </div>
                              {product.Descrição && <p id='Descricao'>({product.Descrição})</p>}
                            </li>
                          ))}
                        </ul> 
                      )}
                    </div>
                  ))}
              </fieldset>
              <fieldset>
                  <legend>Healthy</legend>
                    {MenuHealthy.map((category, index) => (
                      <div key={index}>
                        <h2>{Object.keys(category)[0]}<span>
                        {showListaHealthy[index] ? 
                          (<AiOutlineMinusCircle onClick={() => toggleListaHealthy(index)} />) : 
                          (<AiOutlinePlusCircle onClick={() => toggleListaHealthy(index)} />)
                        }
                        </span></h2>
                        {showListaHealthy[index] && (
                          <ul>
                            {category[Object.keys(category)[0]].map((product, index) => (
                              <li key={index}>
                                <div id='Li'>
                                  {product.Nome} <span><input type="number" name={product.id} min="0" /></span>
                                </div>
                                {product.Descrição && <p id='Descricao'>({product.Descrição})</p>}
                              </li>
                            ))}
                          </ul> 
                        )}
                      </div>
                    ))}
              </fieldset>
              <textarea placeholder='Pedidos especiais...' />
              <input type="submit" value="Confirmar Pedido" />
            </form>
        </main>
    </div>
  )
}

export default Formulario