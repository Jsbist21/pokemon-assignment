import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import PokemonList from "./components/PokemonList";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("https://pokeapi.co/api/v2/pokemon");
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokeDetails = await axios(pokemon.url);

          return {
            name: pokeDetails.data.name,
            image: pokeDetails.data.sprites.front_default,
          };
        })
      );

      setPokemons(pokemonData);
    };

    fetchData();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="App">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <PokemonList pokemons={filteredPokemons} />
      </div>
    </>
  );
}

export default App;
