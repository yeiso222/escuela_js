import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import Inicio from "./components/inicio";
import Favoritos from "./components/favoritos";
import Info from "./components/info";
import Coleccion from "./components/coleccion"
import Usuario from "./components/usuario"
import Pokemon from "./components/pokemon"
import './App.css'

function App() {
  return (
    <>
      <Router>
        <header className="c-header">
          <h1>🛍️ Tienda EscuelaJS</h1>
          <p>Encuentra lo que buscas</p>
        </header>
        <nav className='c-menu'>
          <NavLink to="/" end><span>🏠</span>Inicio</NavLink>
          <NavLink to="/coleccion"><span>🛒</span>Carrito</NavLink>
          <NavLink to="/favoritos"><span>❤️</span>Favoritos</NavLink>
          <NavLink to="/info"><span>📊</span>Info</NavLink>
          <NavLink to="/usuario"><span>👤</span>Usuario</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/coleccion" element={<Coleccion />} />
          <Route path="/info" element={<Info />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
