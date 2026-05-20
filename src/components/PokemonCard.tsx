import type { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
}

export const PokemonCard = ({ pokemon, isFavorite }: PokemonCardProps) => {
  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      padding: '15px',
      textAlign: 'center',
      color: '#333',
      position: 'relative'
    }}>
      
      {isFavorite && (
        <span style={{ 
          position: 'absolute', 
          top: '5px', 
          right: '8px', 
          fontSize: '18px',
          color: '#f1c40f' 
        }}>
          ★
        </span>
      )}

      <img 
        src={pokemon.image} 
        alt={pokemon.name} 
        style={{ width: '80px', height: '80px' }} 
      />
      <h3 style={{ textTransform: 'capitalize', margin: '10px 0 5px 0' }}>
        {pokemon.name}
      </h3>
      
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
        {pokemon.types.map((type) => (
          <span key={type} style={{
            backgroundColor: '#ddd',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};