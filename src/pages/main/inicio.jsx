import React, { useState, useEffect, useRef } from 'react';
import './inicio.css';

const Aniversario = () => {
  const diapositivas = [
    {
      imagen: `fotos/primera.jpg`,
      titulo: 'Primer foto oficial',
      parrafo: 'Todo estaba iniciando. No eramos nada, pero yo estaba perdidamente enamorado de vos.',
      audio: 'audio/de_cabeza.mp3' // Pedazo de canción para esta slide
    },
    {
      imagen: 'fotos/san_pedro.jpg',
      titulo: 'Nuestro primer viaje',
      parrafo: 'Sin tanta planificacion, nos pegamos una hermosa escapada a San Pedro, y si ya habia sospechas de lo nuestro... Pilar termino de confirmarlas al regreso.',
      audio: 'audio/de_cabeza.mp3' // Puedes repetir el audio si quieres que dure 2 slides
    },
    {
      imagen: 'fotos/parque.jpeg',
      titulo: 'Volvés mágico lo cotidiano',
      parrafo: 'En un parque o en un crucero, tomando mates o cerveza, siempre sos mi mejor compañía.',
      audio: 'audio/hay_un_lugar_cortado.mp3' // Puedes repetir el audio si quieres que dure 2 slides
    },
    {
      imagen: 'fotos/noche_mar.jpeg',
      titulo: 'Mi Sol en la oscuridad',
      parrafo: 'Cuando todo parece perdido, oscuro y sin rumbo, siempre estas vos para sacarme a flote y hacerme sonreír.',
      audio: 'audio/hay_un_lugar_cortado.mp3' // Puedes repetir el audio si quieres que dure 2 slides
    },
    {
      imagen: 'fotos/rebelde.jpeg',
      titulo: 'Bonita de más',
      parrafo: 'El brillo de tus ojos esa noche fue bello. Amo verte feliz y compartir momentos así con vos.',
      audio: 'audio/bonita.mp3'
    },
    {
      imagen: 'fotos/sola.jpeg',
      titulo: 'Simplemente vos',
      parrafo: 'Una vos solita porque sos la linda de la relación y me gusta mucho esa foto',
      audio: 'audio/bonita.mp3'
    },
       {
      imagen: 'fotos/playa.jpeg',
      titulo: 'Viajes y el CEF',
      parrafo: 'Siempre pienso que nuestras vidas de alguna forma estaban conectadas. No sé, de alguna manera estabamos destinados a ser la pareja ideal',
      audio: 'audio/y_asi_sera.mp3'
    },
      {
      imagen: 'fotos/uruguay.jpg',
      titulo: 'Uruguay',
      parrafo: 'Nosotros haciendonos los lindos luego de caminar 754 km para llegar a una playa',
      audio: 'audio/y_asi_sera.mp3'
    },
     
    {
      imagen: 'fotos/teen.png',
      titulo: 'Reencuentro de los Teen',
      parrafo: 'Esta  fotito viene del futuro, del dia en que los teen se reencuentren y vayamos al concierto',
      audio: 'audio/pensar_en_vos.mp3'
    },
       {
      imagen: 'fotos/atardecer.jpg',
      titulo: '¡Felices 2 Años!',
      parrafo: 'Por muchos años más creciendo, riendo y soñando juntos. ¡Te amo infinito! PD: es mi foto favorita de los dos',
      audio: 'audio/pensar_en_vos.mp3'
    }
  ];

  const [comenzado, setComenzado] = useState(false);
  const [indiceActual, setIndiceActual] = useState(0);
  const [textoVisible, setTextoVisible] = useState('');
  const [terminoDeEscribir, setTerminoDeEscribir] = useState(false);
  
  const audioRef = useRef(new Audio());
  const cancionActualRef = useRef(null);
  const velocidadEscritura = 80;

  // Lógica para cambiar y reproducir el audio cuando cambia la diapositiva
  useEffect(() => {
    if (comenzado) {
      const audioPath = diapositivas[indiceActual].audio;
      
      // Solo cambiamos el audio si es distinto al que ya está sonando
      if (cancionActualRef.current !== audioPath) {
        console.log(cancionActualRef.current)
        console.log(audioPath)
        audioRef.current.pause();
        audioRef.current.volume = 0.1
        audioRef.current.src = audioPath;
        audioRef.current.loop = true; // Para que el pedazo de canción no se corte si ella lee lento
        audioRef.current.play().catch(e => console.log("Error al reproducir:", e));
        //actualizar memoria
        cancionActualRef.current = audioPath;
        if(audioPath == 'audio/hay_un_lugar_cortado.mp3'){
          audioRef.current.volume = 0.4
        }
      }
    }
  }, [indiceActual, comenzado]);

  // Efecto de máquina de escribir
  useEffect(() => {
    if (!comenzado) return;

    const parrafoCompleto = diapositivas[indiceActual].parrafo;

    if (textoVisible.length < parrafoCompleto.length) {
      const temporizador = setTimeout(() => {
        setTextoVisible(parrafoCompleto.slice(0, textoVisible.length + 1));
      }, velocidadEscritura);
      return () => clearTimeout(temporizador);
    } else {
      setTerminoDeEscribir(true);
    }
  }, [textoVisible, comenzado, indiceActual]);

  const irASiguiente = () => {
    if (indiceActual < diapositivas.length - 1) {
      setIndiceActual(indiceActual + 1);
      setTextoVisible('');
      setTerminoDeEscribir(false);
    } else {
      alert("¡Feliz aniversario! Aquí termina este recorrido, pero no nuestra historia.");
    }
  };

  const iniciarExperiencia = () => {
    setComenzado(true);
  };

  return (
    <div className="contenedor-principal">
      {!comenzado ? (
        <div className="pantalla-inicio">
          <h1>Dos años juntos</h1>
          <button className="btn-comenzar" onClick={iniciarExperiencia}>Comenzar nuestro viaje</button>
        </div>
      ) : (
        <div className="carrusel">
        
          <img 
            key={indiceActual} 
            src={diapositivas[indiceActual].imagen} 
            alt="Momento especial" 
            className="imagen-activa fade-in" 
          />
          
          <div className="mensaje-superpuesto">
            <h2>{diapositivas[indiceActual].titulo}</h2>
            <p>
              {textoVisible}
              {!terminoDeEscribir && <span className="cursor-titilante">|</span>}
            </p>
            
              {/* El botón aparece con una animación suave solo cuando el texto termina */}
            {terminoDeEscribir && (
              <button className="btn-siguiente fade-in" onClick={irASiguiente}>
                {indiceActual === diapositivas.length - 1 ? "Nuestro futuro..." : "Continuar..."}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Aniversario;