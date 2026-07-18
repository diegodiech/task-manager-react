import { useEffect, useState } from "react";
import { Task, getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = () => {
    getTasks()
      .then(setTasks)
      .catch((error) => console.error("Error al obtener tareas:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (text: string) => {
    createTask(text)
      .then(fetchTasks)
      .catch((error) => console.error("Error al crear tarea:", error));
  };

  const removeTask = (id: number) => {
    deleteTask(id)
      .then(fetchTasks)
      .catch((error) => console.error("Error al eliminar tarea:", error));
  };

  const toggleTask = (id: number) => {
    const taskToToggle = tasks.find((t) => t.id === id);
    if (!taskToToggle) return;

    updateTask(id, !taskToToggle.completed)
      .then(fetchTasks)
      .catch((error) => console.error("Error al actualizar:", error));
  };

  return { tasks, addTask, removeTask, toggleTask };
};
