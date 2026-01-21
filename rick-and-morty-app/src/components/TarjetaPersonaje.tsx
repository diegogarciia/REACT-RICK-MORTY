import { type Character } from '../interfaces/rick-morty.interface';

interface Props {
  character: Character;
  esDetalle?: boolean;
}

export const TarjetaPersonaje = ({ character, esDetalle = false }: Props) => {
  const statusColor = 
    character.status === 'Alive' ? '#55cc44' : 
    character.status === 'Dead' ? '#d63d2e' :
    character.status === 'unknown' ? '#9e9e9e' : 'white' ;

  return (
    <div className='personaje-carta'>
      <img src={character.image} alt={character.name} />

      <h3>#{character.id} - {character.name}</h3>

      <div className="info-container">
        <p>
          <strong>Estado:</strong> 
          <span style={{ color: statusColor, fontWeight: 'bold', marginLeft: '5px' }}>
            {character.status}
          </span>
        </p>

        {esDetalle && (
          <div className="detalles-extra">
            <p><strong>Especie:</strong> {character.species}</p>
            <p><strong>Género:</strong> {character.gender}</p>
            <p><strong>Origen:</strong> {character.origin.name}</p>
            <p><strong>Ubicación actual:</strong> {character.location.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};