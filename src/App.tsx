import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import { getPokemonList, getPokemonDetail } from './services/pokemonService';
import type { Pokemon } from './types/pokemon';
import { PokemonCard } from './components/PokemonCard';
import { PokemonDetail } from './components/PokemonDetail'; 

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const baseList = await getPokemonList();
        
        const detailedPromises = baseList.map(p => getPokemonDetail(p.name));
        const detailedResponses = await Promise.all(detailedPromises);
        
        setPokemonList(detailedResponses);
      } catch (error) {
        console.error("Error cargando Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Cargando Pokédex...</p>;

  return (
    <Routes>
      {/* RUTA 1: La lista principal */}
      <Route path="/" element={
        <div style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center', color: 'white' }}>PokéApp - Clase 2</h1>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '20px' 
          }}>
            {pokemonList.map((pokemon) => (

              <div key={pokemon.id} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        </div>
      } />

      {/* RUTA 2: La pantalla de detalle */}
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;