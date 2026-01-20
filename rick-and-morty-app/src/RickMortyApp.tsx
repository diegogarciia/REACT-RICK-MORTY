import { useState } from "react";
import { useCharacters } from "./hooks/useCharacters";
import { SearchBar } from "./components/SearchBar";

export const RickMortyApp = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState('');

  const { personajes, estaCargando, error } = useCharacters(nombreBusqueda);

  return (
    <>
      <h1>Rick & Morty Lista De Personajes</h1>

      <SearchBar 
        placeholder="Busca un personaje..." 
        onQuery={(valor) => setNombreBusqueda(valor)} 
      />

      {estaCargando && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!estaCargando && (
        <ul>
          {personajes.map(p => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};