import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
const headers = {
  "Cache-Control": "no-cache",
};

const ClientSide = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const resp = await axios.get(url, { headers });

      const promises = resp.data.results.map((result) => {
        return axios.get(result.url);
      });

      const responses = await Promise.all(promises);

      const pokeData = responses.map((r) => {
        return {
          name: r.data.name,
          imgUrl: r.data.sprites.front_default,
        };
      });
      setPokemon(pokeData);
      console.log(pokemon);
    };

    fetchPokemon();
  }, []);
  return pokemon.map((poke) => {
    return (
      <div key={poke.name}>
        <img src={poke.imgUrl} />
        <p>{poke.name}</p>
        <hr />
      </div>
    );
  });
};

export default ClientSide;
