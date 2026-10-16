import { useState, useEffect } from 'react'
import './style.css'

const esValido = (p) =>
  Array.isArray(p.images) && p.images.length > 0 && !p.images[0].includes('placehold')

function Info() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setProductos((data ?? []).filter(esValido)))
      .catch(error => console.error('Error:', error))
  }, [])

  if (productos.length === 0) return <p>Cargando...</p>

  const total = productos.length
  const promedio = productos.reduce((suma, p) => suma + p.price, 0) / total
  const masCaro = productos.reduce((a, b) => (b.price > a.price ? b : a))
  const masBarato = productos.reduce((a, b) => (b.price < a.price ? b : a))
  const porCategoria = productos.reduce((acc, p) => {
    const nombre = p.category?.name ?? 'Otros'
    acc[nombre] = (acc[nombre] || 0) + 1
    return acc
  }, {})

  return (
    <div className="c-info">
      <div className="c-info-hero">
        <h1>Tienda EscuelaJS</h1>
        <p>Datos calculados en vivo desde la API</p>
      </div>

      <div className="c-info-grid">
        <div className="c-info-card"><span>{total}</span><p>Productos</p></div>
        <div className="c-info-card"><span>${promedio.toFixed(0)}</span><p>Precio promedio</p></div>
        <div className="c-info-card"><span>${masCaro.price}</span><p>Más caro</p></div>
        <div className="c-info-card"><span>${masBarato.price}</span><p>Más barato</p></div>
      </div>

      <h2>Productos por categoría</h2>
      {Object.entries(porCategoria).map(([nombre, cantidad]) => (
        <div className="c-info-barra" key={nombre}>
          <p>{nombre} ({cantidad})</p>
          <div className="c-info-fondo">
            <div className="c-info-relleno" style={{ width: `${(cantidad / total) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Info
