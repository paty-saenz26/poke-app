import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import { getPokemonList, getPokemonDetail } from './services/pokemonService';
import type { Pokemon } from './types/pokemon';
import { PokemonCard } from './components/PokemonCard';
import { PokemonDetail } from './components/PokemonDetail'; 
import { PokemonCompare } from './components/PokemonCompare';

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Pokemon[]>([]);

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
        setError("Hubo un problema al cargar los Pokémon.");
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

  const handleAddToCompare = (pokemon: Pokemon, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareList((prev) => {
      if (prev.some((p) => p.id === pokemon.id)) return prev.filter((p) => p.id !== pokemon.id);
      if (prev.length >= 2) {
        alert("Solo puedes comparar 2 Pokémon a la vez.");
        return prev;
      }
      return [...prev, pokemon];
    });
  };

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Cargando Pokédex...</p>;
  if (error) return <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>;

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || pokemon.types.includes(selectedType);
    return matchesName && matchesType;
  });

  const appStyles = {
    backgroundColor: darkMode ? '#121212' : '#f0f0f0',
    color: darkMode ? '#ffffff' : '#333333',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={appStyles}>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{ 
            padding: '8px 15px', 
            cursor: 'pointer', 
            borderRadius: '20px', 
            border: 'none', 
            background: darkMode ? '#f1c40f' : '#2c3e50', 
            color: darkMode ? '#333' : '#fff',
            fontWeight: 'bold'
          }}
        >
          {darkMode ? '☼ Modo Claro' : '☾ Modo Oscuro'}
        </button>
      </div>

      <Routes>
        <Route path="/" element={
          <div>
            <h1 style={{ textAlign: 'center', color: darkMode ? '#ffffff' : '#333333' }}>PokéApp</h1>
            
            <PokemonCompare compareList={compareList} onClear={() => setCompareList([])} />
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <input 
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', marginRight: '10px' }}
              />

              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ padding: '8px' }}>
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
              <p style={{ textAlign: 'center' }}>No se encontraron resultados.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
                {filteredPokemon.map((pokemon) => {
                  const isSelectedForCompare = compareList.some((p) => p.id === pokemon.id);
                  return (
                    <div key={pokemon.id} onClick={() => navigate(`/pokemon/${pokemon.name}`)} style={{ cursor: 'pointer' }}>
                      <PokemonCard pokemon={pokemon} isFavorite={favorites.includes(pokemon.name)} />
                      <button
                        onClick={(e) => handleAddToCompare(pokemon, e)}
                        style={{ 
                          width: '100%', 
                          marginTop: '5px', 
                          padding: '5px', 
                          backgroundColor: isSelectedForCompare ? '#2ecc71' : '#34495e', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '5px', 
                          cursor: 'pointer', 
                          fontSize: '12px' 
                        }}
                      >
                        {isSelectedForCompare ? '✓ Seleccionado' : 'Comparar'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        } />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;