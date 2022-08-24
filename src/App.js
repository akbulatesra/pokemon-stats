import React from 'react'
import "./App.css"
import {useState} from 'react'
import Axios from 'axios'

function App() {
const [pokemonName, setPokemonName] = useState("");
const [pokemon, setPokemon] = useState({
      name:"",
      species:"",
      img: "",
      hp: "",
      attack: "",
      defence: "",
      type: "",
});
const [chosenPokemon, setChosenPokemon] = useState(false)
const searchPokemon= ()=> {
  Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
    setPokemon({
      name: pokemonName,
      species: response.data.species.name,
      img: response.data.sprites.front_default,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defence: response.data.stats[2].base_stat,
      type: response.data.types[0].type.name,
    });
    setChosenPokemon(true)
  })
}

  return (
    <div className='app'>
      <div className='titleSection'>
        <h1>Pokemon Stats</h1>
        <input type="text" onChange={(event)=> {setPokemonName(event.target.value)}}/>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='displaySection'>
        {!chosenPokemon ? (<h1> Please Choose A Pokemon</h1>) : (
        <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.img} alt={pokemon.name} /> 
          <h3> species: {pokemon.species}</h3>
          <h3> type: {pokemon.type}</h3>
          <h4> Hp: {pokemon.hp}</h4>
          <h4> attack: {pokemon.attack}</h4>
          <h4> defence: {pokemon.defence}</h4>

        </>)}
      </div>
    </div>
  )
}

export default App
