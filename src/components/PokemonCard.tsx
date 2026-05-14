import type { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <div className="pokemon-card" style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: '#f9f9f9'
    }}>
      <img 
        src={pokemon.image} 
        alt={pokemon.name} 
        style={{ width: '120px', height: '120px' }} 
      />
      <h3 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h3>
      <div>
        {pokemon.types.map(type => (
          <span key={type} style={{ 
            margin: '0 5px', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            background: '#e0e0e0',
            fontSize: '12px'
          }}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};