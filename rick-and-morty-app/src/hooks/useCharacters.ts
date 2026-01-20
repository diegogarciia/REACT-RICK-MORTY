import { useEffect, useState, useRef } from "react";
import { obtenerPersonajes } from "../actions/obtener.personajes.action";
import type { Character } from "../interfaces/rick-morty.interface";

export const useCharacters = (name: string = '', status: string = '') => {
    const [personajes, setPersonajes] = useState<Character[]>([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cargarPersonajes = async () => {
        try {
            setEstaCargando(true);
            setError(null); 
            
            const data = await obtenerPersonajes(name, status);
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