import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'

import '../../styles/pedidos.sass'

const Pedidos = () => {

  const [PedidoGeral, setPedidoGeral] = useState([])

    const GetPedidos = async() => {
      const Req = await fetch('http://localhost:3000/Pedidos')
      const Data = await Req.json()

      setPedidoGeral(Data)
    }

  function myFunction(index) {
    var PopUp = document.getElementById('PopUp');
    var descricao = PedidoGeral[index].descricao.split(',')
      descricao = descricao.map(item => item.trim()) 
      descricao = descricao.join('<br>')
    var pedidosEspeciais = PedidoGeral[index].pedidosEspeciais

    if (pedidosEspeciais) {
      PopUp.innerHTML = descricao + '<br>' + pedidosEspeciais
    } else {
      PopUp.innerHTML = descricao;
    }

    console.log(PopUp)
    PopUp.classList.toggle('Show')
  }

  function ClosePopUp() {
    var PopUp = document.getElementById('PopUp')
    PopUp.classList.remove('Show')
  }

  const ApagarPedido = async (index) => {
    try {
      const pedido = PedidoGeral[index];
      if (!pedido) {
        throw new Error('Pedido não encontrado');
      }
      const id = pedido.id;
      const req = await fetch(`http://localhost:3000/Pedidos/${id}`, {
        method: 'DELETE'
      })
      setPedidoGeral(PedidoGeral.filter((p) => p.id !== id));
      
      const Mensagem = document.getElementById('MensagemPedido')
      Mensagem.style.display = "block"
      setTimeout(() => {
        Mensagem.style.display = "none"
      }, 2000)
    
    } catch (error) {
      console.log(error);
    }
  }

  const HandleChange = async (index) => {
    const pedido = PedidoGeral[index];
    const id = pedido.id;
    const estado = pedido.estado;
  
    // Obtenha o novo estado selecionado pelo usuário
    const novoEstado = document.getElementById(`Estado-${id}`).value;
  
    // Atualize o estado do pedido no estado local
    setPedidoGeral((prevState) =>
      prevState.map((p) => (p.id === id ? { ...p, estado: novoEstado } : p))
    );
  
    // Envie a solicitação para atualizar o estado do pedido no servidor
    const req = await fetch(`http://localhost:3000/Pedidos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...pedido, estado: novoEstado }),
    });
  };

  useEffect(() => {
    GetPedidos();
  }, [])

  return (
    <div id='PedidosGeral'>
      <header>
        <h1>Gerir Pedidos</h1>
        <Link to="/Home" className='Voltar'>Voltar</Link>
        <h3 id='MensagemPedido'>Pedido Apagado com sucesso</h3>
      </header>
      <main id='Container'>
        <h2>
          <span className='NrPedido'>Nr. Pedido</span>
          <span className='Mesa'>Mesa</span>
          <span className='Pedido'>Pedido</span>
          <span className='Estado'>Estado</span>
        </h2> 
        {PedidoGeral.map((pedido, index) => (
          <p key={index}>
            <span id='PopUp' onClick={ClosePopUp}></span>
            <span className='NrPedido item'>{pedido.id}</span>
            <span className='Mesa item'>{pedido.mesa}</span>
            <span className='Pedido item'><AiOutlinePlusCircle onClick={() => myFunction(index)}/>{pedido.descricao}, {pedido.pedidosEspeciais}</span>
            <span className='Estado item'><select name="Estado" id={`Estado-${pedido.id}`} onChange={() => HandleChange(index)} value={pedido.estado}>
              <option value="Pendente">Pendente</option>
              <option value="Recebido">Recebido</option>
              <option value="A Preparar">A preparar</option>
              <option value="Entregue">Entregue</option>
              </select><BsTrash onClick={() => ApagarPedido(index)}/></span>
          </p>
        ))}
      </main>
    </div>
  )
}

export default Pedidos