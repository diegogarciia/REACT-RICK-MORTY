import { useState } from "react";
import { useCharacters } from "./hooks/useCharacters";
import { SearchBar } from "./components/SearchBar";

export const RickMortyApp = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  
  const [estadoBusqueda, setEstadoBusqueda] = useState('');

  const { personajes, estaCargando, error } = useCharacters(nombreBusqueda, estadoBusqueda);

  return (
    <>
      <h1>Rick & Morty Lista De Personajes</h1>

      <SearchBar 
        placeholder="Busca un personaje..." 
        onQuery={(valor) => setNombreBusqueda(valor)} 
      />

      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setEstadoBusqueda('')}
          style={{ fontWeight: estadoBusqueda === '' ? 'bold' : 'normal' }}
        >
          Todos
        </button>
        <button 
          onClick={() => setEstadoBusqueda('alive')}
          style={{ color: 'green', fontWeight: estadoBusqueda === 'alive' ? 'bold' : 'normal' }}
        >
          Vivos
        </button>
        <button 
          onClick={() => setEstadoBusqueda('dead')}
          style={{ color: 'red', fontWeight: estadoBusqueda === 'dead' ? 'bold' : 'normal' }}
        >
          Muertos
        </button>
        <button 
          onClick={() => setEstadoBusqueda('unknown')}
          style={{ color: 'gray', fontWeight: estadoBusqueda === 'unknown' ? 'bold' : 'normal' }}
        >
          Desconocido
        </button>
      </div>

      {estaCargando && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!estaCargando && !error && (
        <ul>
          {personajes.map(p => (
            <li key={p.id}>
              {p.name} - <b>{p.status}</b>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};