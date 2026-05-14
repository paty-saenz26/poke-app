import type { Pokemon, PokemonDetailResponse, PokeAPIResponse } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonList = async () => {
  const response = await fetch(`${API_URL}?limit=20`);
  const data: PokeAPIResponse = await response.json();
  return data.results;
};

export const getPokemonDetail = async (nameOrId: string | number): Promise<Pokemon> => {
  const response = await fetch(`${API_URL}/${nameOrId}`);
  
  if (!response.ok) {
    throw new Error('No se pudo obtener el detalle del Pokémon');
  }

  const data: PokemonDetailResponse = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
};