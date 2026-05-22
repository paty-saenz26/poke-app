import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';

export const PokemonDetail = () => {
  const { name } = useParams(); 
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (name) {
      getPokemonDetail(name).then((data) => {
        setPokemon(data);
        const savedFavorites = localStorage.getItem('pokefavoritos');
        const favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];
        setIsFavorite(favoritesArray.includes(data.name));
      });
    }
  }, [name]);

  const toggleFavorite = () => {
    if (!pokemon) return;
    const savedFavorites = localStorage.getItem('pokefavoritos');
    let favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];
    if (favoritesArray.includes(pokemon.name)) {
      favoritesArray = favoritesArray.filter((fav: string) => fav !== pokemon.name);
      setIsFavorite(false);
    } else {
      favoritesArray.push(pokemon.name);
      setIsFavorite(true);
    }
    localStorage.setItem('pokefavoritos', JSON.stringify(favoritesArray));
  };

  if (!pokemon) return <p style={{ textAlign: 'center' }}>Cargando detalles...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', marginRight: '10px', padding: '8px 15px', cursor: 'pointer' }}>
        Volver
      </button>

      <button onClick={toggleFavorite} style={{ marginBottom: '20px', padding: '8px 15px', cursor: 'pointer' }}>
        {isFavorite ? '★ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
      </button>
      
      <div style={{ background: 'rgba(128,128,128,0.1)', padding: '30px', borderRadius: '20px', maxWidth: '500px', margin: '0 auto', border: '1px solid rgba(128,128,128,0.3)' }}>
        <h1 style={{ textTransform: 'capitalize', margin: '0' }}>{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '250px' }} />
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '20px 0' }}>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        </div>

        <h3>Estadísticas Base</h3>
        <div style={{ display: 'inline-block', textAlign: 'left', width: '100%', maxWidth: '300px' }}>
          {pokemon.stats?.map(stat => (
            <div key={stat.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ textTransform: 'capitalize' }}>{stat.name}:</span> 
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};