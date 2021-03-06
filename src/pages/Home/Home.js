/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Container } from "./styles";
import { formatPokeList } from "../../utils/utils";
import PokeList from "../../components/PokeList";
import Pagination from "../../components/Pagination";
import Team from "../../components/Team";
import api from "../../services/api";

const Home = () => {
  const [listOfPokemons, setListOfPokemons] = useState([{}]);
  const [favouritedPokemons, setFavouritedPokemons] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = (pageNumber = 0) => {
    const offset = pageNumber === 1 ? (pageNumber = 0) : pageNumber * 9;
    const limit = 15;
    return api
      .get(`?offset=${offset}&limit=${limit}`)
      .then(({ data }) => {
        const pokemons = data?.results.map(formatPokeList);
        return setListOfPokemons(pokemons);
      })
      .catch((err) => {
        console.log("Vish! deu um erroMon" + err);
      });
  };

  function addPokemonToFavorite(pokemon) {
    setFavouritedPokemons([...favouritedPokemons, pokemon]);
  }

  function removePokemonFromFavorite(pokemon) {
    const pokemons = [...favouritedPokemons];
    const index = pokemons.findIndex((item) => item.id === pokemon.id);
    if (index === -1) return;
    pokemons.splice(index, 1);
    setFavouritedPokemons(pokemons);
  }

  function isFavorited(pokemon) {
    const favoritedPoke = favouritedPokemons.find(
      (item) => item.id === pokemon.id
    );
    return favoritedPoke;
  }

  function handleSelect(pokemon) {
    if (favouritedPokemons.length >= 6) {
      alert("Só pode adicionar 6 pokemons");
      return;
    }

    isFavorited(pokemon)
      ? removePokemonFromFavorite(pokemon)
      : addPokemonToFavorite(pokemon);
  }

  return (
    <Container>
      <Team pokemons={favouritedPokemons} handleDelete={removePokemonFromFavorite} />
      <PokeList
        pokemons={listOfPokemons}
        handleSelect={handleSelect}
        handleFavorited={isFavorited}
      />
      <Pagination handleChange={fetchPokemon} />
    </Container>
  );
};

export default Home;
