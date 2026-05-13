import { useEffect, useState } from 'react'
import { getPokemonList } from './services/pokemonService'
import type { PokemonListItem } from './types/pokemon';

function App() {
  const [list, setList] = useState<PokemonListItem[]>([])

  useEffect(() => {
    getPokemonList().then(data => setList(data))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Pokémon</h1>
      <ul>
        {list.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App