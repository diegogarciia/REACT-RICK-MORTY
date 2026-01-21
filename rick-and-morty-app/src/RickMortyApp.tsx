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
  const [historial, setHistorial] = useState<string[]>([]);

  const { 
    personajes, 
    estaCargando, 
    error, 
    tieneMas, 
    cargarSiguientePagina 
  } = useCharacters(nombreBusqueda, estadoBusqueda);

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
        <div className="detalle-personaje">
          <h2>Detalle del Personaje Seleccionado</h2>
          <TarjetaPersonaje character={seleccionado} esDetalle={true} />
          <button onClick={() => setSeleccionado(null)}>
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

      <div className="botones-estado">
        <button id="boton-estado-todos" onClick={() => setEstadoBusqueda('')}>Todos</button>
        <button id="boton-estado-vivos" onClick={() => setEstadoBusqueda('alive')}>Vivos</button>
        <button id="boton-estado-muertos" onClick={() => setEstadoBusqueda('dead')}>Muertos</button>
        <button id="boton-estado-desconocido" onClick={() => setEstadoBusqueda('unknown')}>Desconocido</button>
      </div>

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

      {tieneMas && !error && (
        <div className="cargar-mas-div">
          <button 
            onClick={cargarSiguientePagina}
            disabled={estaCargando}
          >
            {estaCargando ? 'Cargando más...' : 'Cargar más personajes'}
          </button>
        </div>
      )}

      {estaCargando && personajes.length === 0 && <p>Cargando lista...</p>}
    </>
  );
};