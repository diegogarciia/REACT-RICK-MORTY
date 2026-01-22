import { rickMortyApi } from "../api/rick-morty.api";
import { Pagination } from "../interfaces/rick-morty.interface";

export const obtenerPersonajes = async (name: string = '', status: string = '', page: number = 1) => {

    try {
        
        const respuesta = await rickMortyApi.get('/character', {
            params: {
                name,   
                status,
                page 
            }
        });
        
        const { results, info } = respuesta.data;
        
        const promesas = results.map(async (p: any) => {
            
            const detalleResp = await fetch(p.url); 
            const datos = await detalleResp.json();
            
            return {
                id: datos.id,
                name: datos.name,
                status: datos.status,
                species: datos.species,
                type: datos.type,
                gender: datos.gender,
                origin: datos.origin,
                location: datos.location,
                image: datos.image,
                episode: datos.episode,
                url: datos.url,
                created: datos.created,
        };
    });

    const personajes = await Promise.all(promesas);

    return {
      results: personajes,
      info: info as Pagination
    };

} catch (error) {
    console.warn("No se encontraron personajes", error);
    return { results: [], info: null };
}
};