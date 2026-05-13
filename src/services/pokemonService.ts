import type { PokeAPIResponse } from '../types/pokemon';

export const getPokemonList = async () => {
  // Pedimos 20 pokemon como dice la Clase 1
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data: PokeAPIResponse = await response.json();
  return data.results;
};