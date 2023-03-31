import React, {useState, useEffect} from 'react';
import Card from './Card';
import Pagination from './Pagination';
import './main.css';

const Main = () => {
  const [pokemonData, setPokemonData] =useState([])
  const initialURL = "https://pokeapi.co/api/v2/pokemon/"
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [prevPageUrl, setPrevPageUrl] = useState('')
  const [loading, setLoading] = useState(true)


  function getPokemon({url}){
    return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json()).then(data => {
        resolve(data)
      })
    });
  }

  function getAllPokemons(url){
    return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json()).then(data => resolve(data))
    })
  }

  useEffect(() => {
    
    async function fetchData() {
      let response = await getAllPokemons(initialURL)
      setNextPageUrl(response.next);
      setPrevPageUrl(response.previous);
      await fetchPokemons(response.results);
      setLoading(false);
    }
    fetchData();
  
  }, [])

  const goToNextPage = async() => {
    setLoading(true)
    let data = await getAllPokemons(nextPageUrl)
    await fetchPokemons(data.results)
    setNextPageUrl(data.next)
    setPrevPageUrl(data.previous)
    setLoading(false)
    
  }

  const goToPrevPage = async() =>{
    if (!prevPageUrl) return;
    setLoading(true)
    let data = await getAllPokemons(prevPageUrl)
    await fetchPokemons(data.results)
    setNextPageUrl(data.next)
    setPrevPageUrl(data.previous)
    setLoading(false)

  }

  const fetchPokemons = async (data) => {
    let pokemonsInfo = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(pokemonsInfo);
  }

  
  return (
    <>
      <div>
          <h1 style={{textAlign: 'center', color: 'purple'}}>Pokedex</h1>
            {loading ? <h4 style={{textAlign: 'center', color: 'blue'}}>Loading...</h4> : (
              <>
                <div className="grid-container">
                {pokemonData.map((pokemonStats, index) => {
                  return <Card key={index} pokemon={pokemonStats} />
                })} 
                </div>
                <div className="btn">
                  <Pagination goToNextPage={nextPageUrl? goToNextPage : null}
                  goToPrevPage={prevPageUrl? goToPrevPage :null}/>
                </div>
                
              </>

            )}
                
            </div>
        
    </>
  );
}

export default Main;
