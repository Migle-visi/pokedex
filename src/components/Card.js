import React from "react";
import typeColors from "./typeColors";
import {Link} from 'react-router-dom'
import './card.css';

function Card({ pokemon }) {
    return (
        <Link to={`/pokemon/${pokemon.id}`} style={{textDecoration: 'inherit', color: 'inherit'}}>
        <div className="Card">
            <div>
                <small>#0{pokemon.id}</small>
            </div>
            <div className="Card__img">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="Card__name">
                {pokemon.name}
            </div>
            <div className="Card__types">
                {
                    pokemon.types.map(type => {
                        return (
                            <div className="Card__type" key={type.type.name} style={{ backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="Card__info">
                <div className="Card__data Card__data--weight">
                    <p className="title">Weight: </p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="Card__data Card__data--height">
                    <p className="title">Height: </p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="Card__data Card__data--ability">
                    <p className="title">Ability: </p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
        </Link>
    );
}

export default Card;