import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import './style.css'

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });
  const esFavorito = favoritos.some(p => p.id === producto?.id);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(response => response.json())
      .then(responseData => setProducto(responseData))
      .catch(error => console.error("Error:", error));
  }, [id]);

  const toggleFavorito = () => {
    let nuevosFavoritos;
    if (esFavorito) {
      nuevosFavoritos = favoritos.filter(p => p.id !== producto.id);
    } else {
      nuevosFavoritos = [
        ...favoritos,
        { id: producto.id, nombre: producto.title, imagen: producto.images[0] }
      ];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  const agregarAlCarrito = () => {
    let carrito;
    try {
      carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    } catch {
      carrito = [];
    }
    const existente = carrito.find(p => p.id === producto.id);
    const nuevo = existente
      ? carrito.map(p => (p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p))
      : [...carrito, {
          id: producto.id,
          nombre: producto.title,
          imagen: producto.images[0],
          precio: producto.price,
          cantidad: 1
        }];
    localStorage.setItem('carrito', JSON.stringify(nuevo));
    setMensaje('Agregado al carrito ✔');
  };

  const compartir = async () => {
    const texto = `${producto.title} - $${producto.price}`;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: producto.title, text: texto, url });
        return;
      }
    } catch {
      return;
    }
    const campo = document.createElement('textarea');
    campo.value = `${texto} ${url}`;
    document.body.appendChild(campo);
    campo.select();
    document.execCommand('copy');
    document.body.removeChild(campo);
    setMensaje('Enlace copiado ✔');
  };

  if (!producto || !producto.id) return <p>Cargando...</p>;

  return (
    <div className="c-detalle">
      <img src={producto.images[0]} alt={producto.title} />
      <h1>{producto.title}</h1>
      <p className="c-precio">${producto.price}</p>
      <p className="c-descripcion">{producto.description}</p>
      <button onClick={toggleFavorito}>{esFavorito ? '❤️' : '🤍'}</button>
      <button className="c-btn-carrito" onClick={agregarAlCarrito}>Agregar al carrito</button>
      <button className="c-btn-compartir" onClick={compartir}>Compartir</button>
      {mensaje && <p className="c-mensaje">{mensaje}</p>}
    </div>
  )
}

export default Producto