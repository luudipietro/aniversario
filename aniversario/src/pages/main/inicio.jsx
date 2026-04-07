const { useState, useRef, useEffect } = require("react");

const Aniversario = () => {
    // archivos
    
    const imagenes = [ 

    ];
    const cancion = "";

    //estados
    const [comenzado, setComenzado] = useState(false)
    const [indiceImagen, setIndiceImagen] = useState(0)
    const audioRef = useRef(null);

    useEffect(() => {
        let intervalo;
        if (comenzado){
            intervalo = setInterval(() => {
                setIndiceImagen((prevIndice) => (prevIndice + 1 ) %imagenes.length);
            }, 4000);
        }
        return () => clearInterval(intervalo);
    }, [comenzado, imagenes.length]);

    const iniciarExperiencia = () => {
        setComenzado(true);
        if (audioRef.current){
            audioRef.current.play();
            
        }

    };

    return (
        <div className="container">
            <audio ref= {audioRef} src={cancion} loop ></audio>
            {!comenzado ? (
                <div className="pantalla-inicio">
                    <h1>¡Felices 2 Años!</h1>
                    <button onClick={iniciarExperiencia}>Comenzar</button>
                </div>
            ) : (
                <div>
                    <div/>
            )}


        </div>
    )

}