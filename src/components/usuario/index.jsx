import { useState } from 'react'
import './style.css'

const leer = (clave) => {
  try { return JSON.parse(localStorage.getItem(clave) || '[]') } catch { return [] }
}

function Usuario() {
  const [favoritos] = useState(() => leer('favoritos'))
  const [carrito] = useState(() => leer('carrito'))
  const unidades = carrito.reduce((s, p) => s + p.cantidad, 0)
  const total = carrito.reduce((s, p) => s + p.precio * p.cantidad, 0)

  return (
    <div className="c-usuario">
      <div className="c-usuario-avatar">👤</div>
      <h1>Mi perfil</h1>
      <p className="c-usuario-sub">Resumen de tu actividad en la tienda</p>
      <div className="c-usuario-grid">
        <div className="c-usuario-card"><span>{favoritos.length}</span><p>Favoritos</p></div>
        <div className="c-usuario-card"><span>{unidades}</span><p>Productos en el carrito</p></div>
        <div className="c-usuario-card"><span>${total}</span><p>Total del carrito</p></div>
      </div>
    </div>
  )
}

export default Usuario
