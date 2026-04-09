import React, { useState, useEffect, useRef } from 'react';
import './inicio.css';

const Aniversario = () => {
  // 1. Tus datos: Ahora cada foto tiene su propio título y mensaje
  const diapositivas = [
    {
      imagen: '/fotos/foto1.jpg',
      titulo: 'Nuestro primer viaje',
      parrafo: 'Todavía me acuerdo de lo felices que estábamos este día. Fue el momento en el que supe que quería compartir todos mis viajes con vos.'
    },
    {
      imagen: '/fotos/foto2.jpg',
      titulo: 'El día a día',
      parrafo: 'Me encanta que hasta hacer las compras o mirar una serie se vuelve un planazo si estoy a tu lado. Sos mi lugar seguro.'
    },
    {
      imagen: '/fotos/foto3.jpg',
      titulo: '¡Felices 2 Años!',
      parrafo: 'Gracias por enseñarme lo lindo que es el amor sano. Por muchos años más creciendo, riendo y soñando juntos. ¡Te amo infinito!'
    }
  ];

  // Configuración de tiempos
  const velocidadEscritura = 40; // Milisegundos entre cada letra (más bajo = más rápido)
  const tiempoParaLeer = 5000;   // Tiempo de espera (5 segundos) DESPUÉS de que termina de escribir

  // Estados
  const [comenzado, setComenzado] = useState(false);
  const [indiceActual, setIndiceActual] = useState(0);
  const [textoVisible, setTextoVisible] = useState('');
  const [terminoDeEscribir, setTerminoDeEscribir] = useState(false);
  
  const audioRef = useRef(null);

  // EFECTO 1: La máquina de escribir
  useEffect(() => {
    if (!comenzado) return; // Si no empezó, no hacemos nada

    const parrafoCompleto = diapositivas[indiceActual].parrafo;

    // Si todavía faltan letras por escribir...
    if (textoVisible.length < parrafoCompleto.length) {
      const temporizador = setTimeout(() => {
        // Agregamos la siguiente letra al texto visible
        setTextoVisible(parrafoCompleto.slice(0, textoVisible.length + 1));
      }, velocidadEscritura);
      
      return () => clearTimeout(temporizador);
    } else {
      // Si ya se escribieron todas las letras, avisamos que terminó
      setTerminoDeEscribir(true);
    }
  }, [textoVisible, comenzado, indiceActual]); 
  // Este efecto se vuelve a ejecutar cada vez que cambia textoVisible

  // EFECTO 2: La pausa y el cambio de foto
  useEffect(() => {
    // Solo arrancamos este contador si el texto YA terminó de escribirse
    if (terminoDeEscribir) {
      const temporizadorCambio = setTimeout(() => {
        // 1. Pasamos a la siguiente foto
        setIndiceActual((prevIndice) => (prevIndice + 1) % diapositivas.length);
        // 2. Reiniciamos el texto y el estado para la nueva foto
        setTextoVisible('');
        setTerminoDeEscribir(false);
      }, tiempoParaLeer);

      return () => clearTimeout(temporizadorCambio);
    }
  }, [terminoDeEscribir, diapositivas.length]);

  const iniciarExperiencia = () => {
    setComenzado(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="contenedor-principal">
      {/* Etiqueta de audio oculta */}
      <audio ref={audioRef} src="/audio/nuestra_cancion.mp3" loop />

      {!comenzado ? (
        <div className="pantalla-inicio">
          <h1>Dos años increíbles</h1>
          <button onClick={iniciarExperiencia}>Comenzar nuestro viaje</button>
        </div>
      ) : (
        <div className="carrusel">
          {/* Key es importante aquí: fuerza a React a re-animar el fadeIn cuando cambia el índice */}
          <img 
            key={indiceActual} 
            src={diapositivas[indiceActual].imagen} 
            alt="Momento especial" 
            className="imagen-activa fade-in" 
          />
          
          <div className="mensaje-superpuesto">
            <h2>{diapositivas[indiceActual].titulo}</h2>
            {/* Aquí mostramos el texto que se va escribiendo, más un "cursor" parpadeante */}
            <p>
              {textoVisible}
              {!terminoDeEscribir && <span className="cursor-titilante">|</span>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aniversario;