import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Favoritos() {
  const navigate = useNavigate()
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]')
    } catch {
      return []
    }
  })

  const quitar = (id) => {
    const nuevos = favoritos.filter(p => p.id !== id)
    setFavoritos(nuevos)
    localStorage.setItem('favoritos', JSON.stringify(nuevos))
  }

  if (favoritos.length === 0) return <p className="c-vacio">Aún no tienes favoritos.</p>

  return (
    <div className="c-favoritos">
      <h1>Favoritos</h1>
      <div className="c-fav-lista">
        {favoritos.map(p => (
          <div className="c-fav-item" key={p.id}>
            <img src={p.imagen} alt={p.nombre} onClick={() => navigate(`/pokemon/${p.id}`)} />
            <p onClick={() => navigate(`/pokemon/${p.id}`)}>{p.nombre}</p>
            <button onClick={() => quitar(p.id)}>Quitar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favoritos
