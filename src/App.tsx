import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import { getPokemonList, getPokemonDetail } from './services/pokemonService';
import type { Pokemon } from './types/pokemon';
import { PokemonCard } from './components/PokemonCard';
import { PokemonDetail } from './components/PokemonDetail'; 

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        setError(null); 
        const baseList = await getPokemonList();
        const detailedPromises = baseList.map(p => getPokemonDetail(p.name));
        const detailedResponses = await Promise.all(detailedPromises);
        setPokemonList(detailedResponses);
      } catch (err) {
        console.error("Error cargando Pokémon:", err);
        setError("Hubo un problema al cargar los Pokémon. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('pokefavoritos');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      setFavorites([]);
    }
  }, [location]);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Cargando Pokédex...</p>;
  
  
  if (error) return <p style={{ color: '#ff4d4d', textAlign: 'center', marginTop: '20px' }}>{error}</p>;

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || pokemon.types.includes(selectedType);
    return matchesName && matchesType;
  });

  return (
    <Routes>
      <Route path="/" element={
        <div style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center', color: '#333' }}>PokéApp</h1>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <input 
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '8px', marginRight: '10px' }}
            />

            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ padding: '8px' }}
            >
              <option value="">Todos los tipos</option>
              <option value="grass">Grass</option>
              <option value="poison">Poison</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="bug">Bug</option>
              <option value="flying">Flying</option>
            </select>
          </div>

          {filteredPokemon.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center' }}>No se encontraron resultados.</p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
              gap: '20px' 
            }}>
              {filteredPokemon.map((pokemon) => (
                <div 
                  key={pokemon.id} 
                  onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <PokemonCard 
                    pokemon={pokemon} 
                    isFavorite={favorites.includes(pokemon.name)} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      } />

      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;