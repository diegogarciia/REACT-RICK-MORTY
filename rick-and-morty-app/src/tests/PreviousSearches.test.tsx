import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PreviousSearches } from "../components/PreviousSearches";

describe("Pruebas en <PreviousSearches />", () => {
  
  const mockSearches = ["Rick", "Morty"];
  const mockOnLabelClicked = vi.fn(); 

  test("debe de hacer match con el snapshot", () => {
    const { container } = render(
      <PreviousSearches 
        searches={mockSearches} 
        onLabelClicked={mockOnLabelClicked} 
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar los términos de búsqueda proporcionados", () => {
    render(
      <PreviousSearches 
        searches={mockSearches} 
        onLabelClicked={mockOnLabelClicked} 
      />
    );

    expect(screen.getByText("Rick")).toBeTruthy();
    expect(screen.getByText("Morty")).toBeTruthy();
  });

  test("debe de llamar a onLabelClicked al hacer clic en un término", () => {
    render(
      <PreviousSearches 
        searches={mockSearches} 
        onLabelClicked={mockOnLabelClicked} 
      />
    );

    const termElement = screen.getByText("Rick");
    
    fireEvent.click(termElement);

    expect(mockOnLabelClicked).toHaveBeenCalledWith("Rick");
  });
});