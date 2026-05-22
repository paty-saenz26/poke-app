import type { Pokemon } from '../types/pokemon';

const typeColors: { [key: string]: string } = {
  grass: '#78C850', fire: '#F08030', water: '#6890F0', bug: '#A8B820', 
  normal: '#A8A878', poison: '#A040A0', electric: '#F8D030', ground: '#E0C068', 
  fairy: '#EE99AC', fighting: '#C03028', psychic: '#F85888', rock: '#B8A038', 
  ghost: '#705898', ice: '#98D8D8', dragon: '#7038F8'
};

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean; 
}

export const PokemonCard = ({ pokemon, isFavorite }: PokemonCardProps) => {
  const mainType = pokemon.types[0];
  const backgroundColor = typeColors[mainType] || '#777';

  return (
    <div style={{
      background: backgroundColor,
      borderRadius: '15px',
      padding: '15px',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      border: '1px solid rgba(255,255,255,0.3)'
    }}>
      

      {isFavorite && (
        <span style={{ 
          position: 'absolute', 
          top: '5px', 
          right: '8px', 
          fontSize: '18px', 
          color: '#f1c40f', 
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)' 
        }}>
          ★
        </span>
      )}

      <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '10px', display: 'inline-block' }}>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
      </div>
      
      <h3 style={{ textTransform: 'capitalize', margin: '10px 0', fontSize: '18px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
        {pokemon.name}
      </h3>
      
      <div style={{ marginTop: '5px' }}>
        {pokemon.types.map((type) => (
          <span key={type} style={{ display: 'inline-block', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', margin: '0 2px', textTransform: 'capitalize' }}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};