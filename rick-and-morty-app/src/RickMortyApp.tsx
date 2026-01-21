import { useState } from "react";
import { useCharacters } from "./hooks/useCharacters";
import { SearchBar } from "./components/SearchBar";
import { TarjetaPersonaje } from "./components/TarjetaPersonaje";
import type { Character } from "./interfaces/rick-morty.interface";
import { PreviousSearches } from "./components/PreviousSearches";

export const RickMortyApp = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState('');

  const [estadoBusqueda, setEstadoBusqueda] = useState('');

  const [seleccionado, setSeleccionado] = useState<Character | null>(null);

  const { personajes, estaCargando, error } = useCharacters(nombreBusqueda, estadoBusqueda);

  const [historial, setHistorial] = useState<string[]>([]);

  const manejarNuevaBusqueda = (nombre: string) => {
    const nombreLimpio = nombre.toLowerCase().trim();
    if (nombreLimpio.length === 0) return;

    setNombreBusqueda(nombreLimpio);

    setHistorial(prev => {
      const nuevo = [nombreLimpio, ...prev.filter(item => item !== nombreLimpio)];
      return nuevo.slice(0, 5);
    });
  };

  return (
    <>
      <h1>Rick & Morty Lista De Personajes</h1>

      {seleccionado && (
        <div style={{ 
          border: '2px solid #55cc44', 
          borderRadius: '10px', 
          padding: '20px', 
          marginBottom: '30px',
          backgroundColor: '#242424' 
        }}>
          <h2>Detalle del Personaje Seleccionado</h2>
          <TarjetaPersonaje character={seleccionado} esDetalle={true} />
          <button 
            onClick={() => setSeleccionado(null)}
            style={{ marginTop: '10px' }}
          >
            Cerrar Detalle
          </button>
        </div>
      )}

      <SearchBar 
        placeholder="Busca un personaje..." 
        onQuery={manejarNuevaBusqueda} 
      />

      <PreviousSearches 
        searches={historial} 
        onLabelClicked={(valor) => setNombreBusqueda(valor)} 
      />

      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <button onClick={() => setEstadoBusqueda('')} style={{ fontWeight: estadoBusqueda === '' ? 'bold' : 'normal' }}>Todos</button>
        <button onClick={() => setEstadoBusqueda('alive')} style={{ color: 'green', fontWeight: estadoBusqueda === 'alive' ? 'bold' : 'normal' }}>Vivos</button>
        <button onClick={() => setEstadoBusqueda('dead')} style={{ color: 'red', fontWeight: estadoBusqueda === 'dead' ? 'bold' : 'normal' }}>Muertos</button>
        <button onClick={() => setEstadoBusqueda('unknown')} style={{ color: 'gray', fontWeight: estadoBusqueda === 'unknown' ? 'bold' : 'normal' }}>Desconocido</button>
      </div>

      {estaCargando && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!estaCargando && !error && (
        <div className="personajes-grid"> 
          {personajes.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSeleccionado(p)}
              style={{ cursor: 'pointer' }}
            >
              <TarjetaPersonaje character={p} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};