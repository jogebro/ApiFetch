import React,{useEffect, useState} from 'react';
const efecto = {
  objectFit: "cover"
}
export default function App(){
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState('1');

  useEffect(()=>{
      if(isLoading){
        async function fetchData(){
          try {
            const response = await fetch(`https://dog.ceo/api/breeds/image/random/${cantidad}`)
            if(response.ok){
              const dog = await response.json();
              setImageUrl(dog.message);
              setError(null);
              setIsLoading(false);
            }else{
              setError("No hay ninguna imagen de perrito")
            }
          } catch (error) {
            setError("El api no esta respondiendo");
          }
        }
        fetchData();
      }
  },[isLoading])

  const randomDog = ()=>{
    const cant = prompt('Cuantos perros?');
    setCantidad(cant);
    setIsLoading(true);
  }

  if(isLoading){
    return(
      <div className='App'>
        <h1>Cargando . . .</h1>
        <button onClick={randomDog}>Cargar imagenes</button>
      </div>
    )
  }

  if(isLoading){
    return(
      <div className='App'>
        <h1>{error}</h1>
        <button onClick={randomDog}>Vuelve a intentar</button>
      </div>
    )
  }

  return(
    <div className='App'>
      {
        imageUrl.map((url, index)=>(
          <img key={index} src={url} alt='imagen de perrito' height="500px" width="500px" style={efecto}/>
        ))
      }
        <button onClick={randomDog}>Cambiar imagen</button>
    </div>
  )
}