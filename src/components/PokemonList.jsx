import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
