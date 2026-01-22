import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchBar } from "../components/SearchBar";

describe("Pruebas en <SearchBar />", () => {
  const mockOnQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); 
  });

  test("debe de enfocarse el input al montar el componente", () => {
    render(<SearchBar onQuery={mockOnQuery} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input).toBe(document.activeElement); 
  });

  test("debe de llamar a onQuery después de 700ms (debounce)", () => {
    render(<SearchBar onQuery={mockOnQuery} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Rick" } });

    expect(mockOnQuery).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(mockOnQuery).toHaveBeenCalledWith("Rick");
  });

  test("debe de llamar a onQuery inmediatamente al pulsar Enter", () => {
    render(<SearchBar onQuery={mockOnQuery} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Morty" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnQuery).toHaveBeenCalledWith("Morty");
  });

  test("debe de hacer match con el snapshot", () => {
    const { container } = render(<SearchBar onQuery={mockOnQuery} />);
    expect(container).toMatchSnapshot();
  });
});