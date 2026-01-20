import { rickMortyApi } from "../api/rick-morty.api";
import type { Character } from "../interfaces/rick-morty.interface";

export const obtenerPersonajes = async (name: string = '', status: string = ''): Promise<Character[]> => {
    
    const respuesta = await rickMortyApi.get<any>('/character', {
        params: {
            name,   
            status  
        }
    });
    
    const listaBasica = respuesta.data.results;

    const promesas = listaBasica.map(async (p: any) => {
        const detalleResp = await fetch(p.url); 
        const datos = await detalleResp.json();

        return {
            id: datos.id,
            name: datos.name,
            status: datos.status,
            species: datos.species,
            type:     datos.type,
            gender:   datos.gender,
            origin:   datos.origin,
            location: datos.location,
            image:    datos.image,
            episode:  datos.episode,
            url:      datos.url,
            created:  datos.created,
        };
    });

    return Promise.all(promesas);
};