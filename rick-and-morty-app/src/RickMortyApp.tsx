import { useCharacters } from "./hooks/useCharacters";

export const RickMortyApp = () => {
  const { personajes, estaCargando, error } = useCharacters();

  if (estaCargando) return <h2>Cargando personajes...</h2>;

  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
      <h1>Rick & Morty Lista De Personajes</h1>
      <ul>
        {personajes.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.name} width="50" />
            <span>{p.name} - <b>{p.status}</b></span>
          </li>
        ))}
      </ul>
    </>
  );
};