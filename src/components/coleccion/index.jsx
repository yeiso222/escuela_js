import { useState } from 'react'
import './style.css'

function Carrito() {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('carrito') || '[]')
    } catch {
      return []
    }
  })

  const guardar = (nuevo) => {
    setCarrito(nuevo)
    localStorage.setItem('carrito', JSON.stringify(nuevo))
  }

  const cambiar = (id, delta) => {
    guardar(
      carrito
        .map(p => (p.id === id ? { ...p, cantidad: p.cantidad + delta } : p))
        .filter(p => p.cantidad > 0)
    )
  }

  const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)

  if (carrito.length === 0) return <p className="c-carrito-vacio">Tu carrito está vacío.</p>

  return (
    <div className="c-carrito">
      <h1>Mi carrito</h1>
      {carrito.map(p => (
        <div className="c-carrito-item" key={p.id}>
          <img src={p.imagen} alt={p.nombre} />
          <div className="c-carrito-info">
            <p className="c-carrito-nombre">{p.nombre}</p>
            <p className="c-carrito-precio">${p.precio * p.cantidad}</p>
          </div>
          <div className="c-carrito-cantidad">
            <button onClick={() => cambiar(p.id, -1)}>-</button>
            <span>{p.cantidad}</span>
            <button onClick={() => cambiar(p.id, 1)}>+</button>
          </div>
        </div>
      ))}
      <div className="c-carrito-total">Total: ${total}</div>
      <button className="c-carrito-vaciar" onClick={() => guardar([])}>Vaciar carrito</button>
    </div>
  )
}

export default Carrito
