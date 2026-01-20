import { useEffect, useState, useRef } from "react";
import { obtenerPersonajes } from "../actions/obtener.personajes.action";
import type { Character } from "../interfaces/rick-morty.interface";

export const useCharacters = () => {
    const [personajes, setPersonajes] = useState<Character[]>([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const totalPeticiones = useRef(0);

    const cargarPersonajes = async () => {
        try {
            setEstaCargando(true);
            const data = await obtenerPersonajes();
            setPersonajes(data);
            
            totalPeticiones.current++; 
            console.log(`Peticiones realizadas: ${totalPeticiones.current}`);
        } catch (e) {
            setError("Error al cargar personajes");
        } finally {
            setEstaCargando(false);
        }
    };

    useEffect(() => {
        cargarPersonajes();
    }, []);

    return {
        personajes,
        estaCargando,
        error,
        cargarPersonajes,
    };
};