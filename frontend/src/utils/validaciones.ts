import { Task } from "../services/taskService";

export function esTextoDeTareaValido(texto: string): boolean {
  return texto.trim() !== "";
}

export function contarPendientes(tareas: Task[]): number {
  return tareas.filter((t) => !t.completed).length;
}
