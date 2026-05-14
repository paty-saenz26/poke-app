export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokeAPIResponse {
  results: PokemonListItem[];
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: {
    name: string;
    value: number;
  }[];
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}