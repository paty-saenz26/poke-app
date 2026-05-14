import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';

export const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (name) {
      getPokemonDetail(name).then(setPokemon);
    }
  }, [name]);

  if (!pokemon) return <p>Cargando detalles...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>Volver</button>
      
      <div style={{ background: '#333', padding: '30px', borderRadius: '15px' }}>
        <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '250px' }} />
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '20px 0' }}>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        </div>

        <h3>Estadísticas Base</h3>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          {pokemon.stats?.map(stat => (
            <div key={stat.name}>
              <span style={{ textTransform: 'capitalize' }}>{stat.name}:</span> <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};