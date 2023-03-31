import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pokemonpage.css';
import typeColors from '../components/typeColors'
import { BackButton } from '../components/BackButton';


const PokemonPage = () => {
    
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState([]);
    const baseURL = 'https://pokeapi.co/api/v2/';
    const {id} = useParams();

    const fetchPokemon = async id => {
        const data = await getPokemonById(id)
        setPokemon(data)
        setLoading(false)
    }

    const getPokemonById = async id => {
		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
    }

    useEffect(() => {
        fetchPokemon(id)
    }, []);


    return (
        <div className='container main-pokemon'>
            {loading ? <h4 style={{textAlign: 'center', color: 'blue'}}>Loading...</h4> : (
                <>
                    <div className='header-main-pokemon'>
						<span className='number-pokemon'>#0{pokemon.id}</span>
						<div className='container-img-pokemon'>
							<img
								src={pokemon.sprites.other.dream_world.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>

						<div className='container-info-pokemon'>
							<h1>{(pokemon.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => {
                                return (
                                     <div className="Card__type" key={type.type.name} style={{ backgroundColor: typeColors[type.type.name] }}>
                                         {type.type.name}
                                     </div>
                        )
                    })}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Height</p>
									<span>{pokemon.height}</span>
								</div>
								<div className='group-info'>
									<p>Weight</p>
									<span>{pokemon.weight}KG</span>
								</div>
							</div>
						</div>
					</div>

					<div className='container-stats'>
						<h3>Statistics</h3>
						<div className='stats'>
							<div className='stat-group'>
								<span>Hp</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Speed</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
							</div>
						</div>
					</div>
					<div className="btn">
						<BackButton/>
					</div>
                </>
            )}
        </div>
    );

};

export default PokemonPage;