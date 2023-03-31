import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Main from './components/Main';
import About from './pages/About';
import PokemonPage from './pages/PokemonPage';
import './App.css'

export default function App() {
  return (
    <HashRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/about" element={<About/>} />
            <Route path="pokemon/:id" element={<PokemonPage/>} />
          </Routes>
        </div>
    </HashRouter>
  );
}

