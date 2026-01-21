import { useEffect, useState, useRef } from "react";
import { obtenerPersonajes } from "../actions/obtener.personajes.action";
import type { Character } from "../interfaces/rick-morty.interface";
import { Pagination } from "../interfaces/rick-morty.interface";

export const useCharacters = (name: string = '', status: string = '') => {
    const [personajes, setPersonajes] = useState<Character[]>([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const cache = useRef<Record<string, Character[]>>({});

    const cargarPersonajes = async () => {
        const key = `${name.trim().toLowerCase()}-${status}`;

        if (cache.current[key]) {
            setPersonajes(cache.current[key]);
            setEstaCargando(false);
            setError(null);
            return; 
        }

        try {
            setEstaCargando(true);
            setError(null); 
            
            const data = await obtenerPersonajes(name, status);
            
            cache.current[key] = data;
            setPersonajes(data);
        } catch (e) {
            setPersonajes([]); 
            setError("No se encontraron personajes con esos criterios");
        } finally {
            setEstaCargando(false);
        }
    };

    useEffect(() => {
        cargarPersonajes();
    }, [name, status]); 

    return { personajes, estaCargando, error };
};