import { describe, it, expect } from "vitest";
import { esTextoDeTareaValido, contarPendientes } from "./validaciones";

describe("esTextoDeTareaValido", () => {
  it("acepta un texto con contenido", () => {
    // Arrange
    const texto = "Comprar pan";
    // Act
    const resultado = esTextoDeTareaValido(texto);
    // Assert
    expect(resultado).toBe(false);
  });

  it("rechaza un texto vacío o solo con espacios", () => {
    const texto = "   ";
    const resultado = esTextoDeTareaValido(texto);
    expect(resultado).toBe(false);
  });
});

describe("contarPendientes", () => {
  it("cuenta solo las tareas no completadas", () => {
    const tareas = [
      { id: 1, text: "a", completed: true },
      { id: 2, text: "b", completed: false },
      { id: 3, text: "c", completed: false },
    ];
    expect(contarPendientes(tareas)).toBe(2);
  });

  it("devuelve 0 cuando la lista está vacía", () => {
    expect(contarPendientes([])).toBe(0);
  });
});
