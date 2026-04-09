import React, { useState, useEffect, useRef } from 'react';
import './inicio.css'

const Aniversario = () => {
  // 1. Tus imágenes y canción
  const imagenes = [
    '/fotos/foto1.JPG',
    '/fotos/foto2.JPG',
    '/fotos/foto3.JPG'
  ];
  const cancion = '/audio/nuestra_cancion.mp3';

  // 2. Estados
  const [comenzado, setComenzado] = useState(false);
  const [indiceImagen, setIndiceImagen] = useState(0);
  const audioRef = useRef(null);

  // 3. Efecto para pasar las fotos automáticamente
  useEffect(() => {
    let intervalo;
    if (comenzado) {
      intervalo = setInterval(() => {
        setIndiceImagen((prevIndice) => (prevIndice + 1) % imagenes.length);
      }, 4000); // Cambia la foto cada 4 segundos (4000 ms)
    }
    return () => clearInterval(intervalo);
  }, [comenzado, imagenes.length]);

  // 4. Función para iniciar la experiencia
  const iniciarExperiencia = () => {
    setComenzado(true);
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.04;
    }
  };

  return (
    <div className="contenedor-principal">
      {/* Etiqueta de audio oculta */}
      <audio ref={audioRef} src={cancion} loop />

      {!comenzado ? (
        // Pantalla de inicio para habilitar el audio
        <div className="pantalla-inicio">
          <h1>¡Felices 2 Años!</h1>
          <button onClick={iniciarExperiencia}>Comenzar</button>
        </div>
      ) : (
        // Carrusel de imágenes
        <div className="carrusel">
          <img 
            src={imagenes[indiceImagen]} 
            alt="Nuestros momentos" 
            className="imagen-activa fade-in" 
          />
          <div className="mensaje-superpuesto">
            <h2>Te amo</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aniversario;