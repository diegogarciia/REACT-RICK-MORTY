import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RickMortyApp } from "../RickMortyApp";
import { useCharacters } from "../hooks/useCharacters";

vi.mock("../hooks/useCharacters");

describe("Pruebas en <RickMortyApp />", () => {
  
  const mockPersonajes = [
    { id: 1, name: "Rick", status: "Alive", image: "", origin: { name: "" }, location: { name: "" } }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe de mostrar el estado de carga inicial", () => {
    (useCharacters as any).mockReturnValue({
      personajes: [],
      estaCargando: true,
      error: null,
      tieneMas: false,
      cargarSiguientePagina: vi.fn()
    });

    render(<RickMortyApp />);
    expect(screen.getByText("Cargando lista...")).toBeTruthy();
  });

  test("debe de mostrar la lista de personajes cuando termina de cargar", () => {
    (useCharacters as any).mockReturnValue({
      personajes: mockPersonajes,
      estaCargando: false,
      error: null,
      tieneMas: true,
      cargarSiguientePagina: vi.fn()
    });

    render(<RickMortyApp />);

    expect(screen.getByText(/Rick & Morty Lista De Personajes/i)).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3, name: /Rick/i })).toBeTruthy();
    expect(screen.getByText("Cargar más personajes")).toBeTruthy();
  });

  test("debe de mostrar el detalle de un personaje al hacer clic", () => {
    (useCharacters as any).mockReturnValue({
      personajes: mockPersonajes,
      estaCargando: false,
      error: null,
      tieneMas: false,
      cargarSiguientePagina: vi.fn()
    });

    render(<RickMortyApp />);

    const tarjeta = screen.getByRole('heading', { level: 3, name: /Rick/i });
    fireEvent.click(tarjeta);

    expect(screen.getByText("Detalle del Personaje Seleccionado")).toBeTruthy();
    expect(screen.getByText("Cerrar Detalle")).toBeTruthy();
  });

  test("debe de hacer match con el snapshot", () => {
    (useCharacters as any).mockReturnValue({
      personajes: mockPersonajes,
      estaCargando: false,
      error: null,
      tieneMas: false,
      cargarSiguientePagina: vi.fn()
    });

    const { container } = render(<RickMortyApp />);
    expect(container).toMatchSnapshot();
  });
});