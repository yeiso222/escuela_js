import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const categorias = [
  { id: 'All', nombre: 'Todos' },
  { id: 1, nombre: 'Ropa' },
  { id: 2, nombre: 'Electrónica' },
  { id: 3, nombre: 'Muebles' },
  { id: 4, nombre: 'Zapatos' },
  { id: 5, nombre: 'Variados' }
]

// la API es pública y tiene productos de prueba de otros usuarios: los descartamos
const esValido = (p) =>
  Array.isArray(p.images) && p.images.length > 0 && !p.images[0].includes('placehold')

function Inicio() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const url =
          categoria === 'All'
            ? 'https://api.escuelajs.co/api/v1/products'
            : `https://api.escuelajs.co/api/v1/products/?categoryId=${categoria}`
        const response = await fetch(url)
        const responseData = await response.json()
        setProductos((responseData ?? []).filter(esValido))
      } catch (error) {
        console.error('Error:', error)
      }
    }

    cargarProductos()
  }, [categoria])

  const resultados =
    busqueda.trim().length >= 3
      ? productos.filter((p) => p.title.toLowerCase().includes(busqueda.toLowerCase()))
      : productos

  if (productos.length === 0) return <p>Cargando...</p>
  if (resultados.length === 0) return <p>No se encontraron productos.</p>

  return (
    <>
      <div className="c-filtro">
        {categorias.map((c) => (
          <button type="button" key={c.id} className={categoria === c.id ? 'activo' : ''} onClick={() => setCategoria(c.id)}>
            {c.nombre}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <div className="c-lista">
        {resultados.map((p) => (
          <div className="c-lista-pokemon" key={p.id} onClick={() => navigate(`/pokemon/${p.id}`)}>
            <p>{p.id}</p>
            <p>{p.title}</p>
            <p>${p.price}</p>
            <img src={p.images[0]} alt={p.title} width="auto" height="60" loading="lazy" />
          </div>
        ))}
      </div>
    </>
  )
}

export default Inicio