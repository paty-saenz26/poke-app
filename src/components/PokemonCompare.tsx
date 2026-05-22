import type { Pokemon } from '../types/pokemon';

interface PokemonCompareProps {
  compareList: Pokemon[];
  onClear: () => void;
}

export const PokemonCompare = ({ compareList, onClear }: PokemonCompareProps) => {
  if (compareList.length === 0) return null;

  return (
    <div style={{
      background: '#222',
      color: '#fff', 
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '30px',
      border: '2px dashed #f1c40f'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        
        <h2 style={{ margin: 0, color: '#fff' }}>Comparador de Estadísticas</h2>
        <button onClick={onClear} style={{ padding: '5px 10px', cursor: 'pointer', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px' }}>
          Limpiar Comparación
        </button>
      </div>

      {compareList.length < 2 ? (
        <p style={{ textAlign: 'center', color: '#ddd' }}>Selecciona otro Pokémon de la lista para iniciar la comparación...</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          <div style={{ textAlign: 'center', flex: 1, minWidth: '150px' }}>
            
            <h3 style={{ textTransform: 'capitalize', color: '#fff' }}>{compareList[0].name}</h3>
            <img src={compareList[0].image} alt={compareList[0].name} style={{ width: '80px' }} />
          </div>

          <div style={{ flex: 2, minWidth: '280px' }}>
            {compareList[0].stats.map((stat, index) => {
              const val1 = stat.value;
              const val2 = compareList[1].stats[index]?.value || 0;
              const statName = stat.name;

              return (
                <div key={statName} style={{ margin: '10px 0' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', textTransform: 'capitalize', fontSize: '14px', color: '#ddd' }}>

                    <span style={{ color: val1 > val2 ? '#2ecc71' : '#ddd', fontWeight: val1 > val2 ? 'bold' : 'normal' }}>{val1}</span>
                    <span>{statName}</span>
                    <span style={{ color: val2 > val1 ? '#2ecc71' : '#ddd', fontWeight: val2 > val1 ? 'bold' : 'normal' }}>{val2}</span>
                  </div>
                  <div style={{ display: 'flex', height: '8px', background: '#444', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ width: `${(val1 / (val1 + val2 || 1)) * 100}%`, background: '#3498db' }}></div>
                    <div style={{ width: `${(val2 / (val1 + val2 || 1)) * 100}%`, background: '#e67e22' }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', flex: 1, minWidth: '150px' }}>

            <h3 style={{ textTransform: 'capitalize', color: '#fff' }}>{compareList[1].name}</h3>
            <img src={compareList[1].image} alt={compareList[1].name} style={{ width: '80px' }} />
          </div>

        </div>
      )}
    </div>
  );
};