import { useEffect, useState, useRef } from "react";
import { obtenerPersonajes } from "../actions/obtener.personajes.action";
import type { Character } from "../interfaces/rick-morty.interface";
import { Pagination } from "../interfaces/rick-morty.interface";

interface CacheEntry {
  characters: Character[];
  info: Pagination;
}

export const useCharacters = (name: string = '', status: string = '') => {
    const [personajes, setPersonajes] = useState<Character[]>([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagina, setPagina] = useState(1);
    const [info, setInfo] = useState<Pagination | null>(null);
    const cache = useRef<Record<string, CacheEntry>>({});

    const cargarPersonajes = async () => {
        const key = `${name.trim().toLowerCase()}-${status}-${pagina}`;

        if (cache.current[key]) {
            const { characters, info: cacheInfo } = cache.current[key];
            setPersonajes(prev => pagina === 1 ? characters : [...prev, ...characters]);
            setInfo(cacheInfo);
            setEstaCargando(false);
            return;
        }

        try {
            setEstaCargando(true);
            setError(null); 
            
            const data = await obtenerPersonajes(name, status, pagina);
            const newEntry: CacheEntry = { characters: data.results, info: data.info as Pagination };
            
            cache.current[key] = newEntry;
            setInfo(data.info);
            setPersonajes(prev => pagina === 1 ? data.results : [...prev, ...data.results]);
        } catch (e) {
            setPersonajes([]); 
            setError("No se encontraron personajes con esos criterios");
        } finally {
            setEstaCargando(false);
        }
    };

    useEffect(() => {
        cargarPersonajes();
    }, [name, status, pagina]);
    
    const cargarSiguientePagina = () => {
        if (info?.next) {
            setPagina(prev => prev + 1);
        }
    };

    return { personajes, estaCargando, error , tieneMas: !!info?.next, cargarSiguientePagina};
};