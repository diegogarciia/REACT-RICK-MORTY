import { type Character } from '../interfaces/rick-morty.interface';

interface Props {
  character: Character;
}

export const TarjetaPersonaje = ({ character }: Props) => {
  const statusColor = 
    character.status === 'Alive' ? '#55cc44' : 
    character.status === 'Dead' ? '#d63d2e' : 
    character.status === 'unknown' ? '#9e9e9e' : '#9e9e9e';

  return (
    <div className="personaje-carta">
      <img src={character.image} alt={character.name} />

      <h3>#{character.id} - {character.name}</h3>

      <div className="info-container">
        <p>
          <strong>Estado:</strong> 
          <span style={{ color: statusColor, fontWeight: 'bold', marginLeft: '5px' }}>
            {character.status}
          </span>
        </p>

        <p><strong>Especie:</strong> {character.species}</p>

        <p><strong>Género:</strong> {character.gender}</p>
        
        <p><strong>Origen:</strong> {character.origin.name}</p>
      </div>
    </div>
  );
};