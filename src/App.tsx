import { useEffect, useState } from "react";
import Header from "./componentes/Header";
import TaskList from "./componentes/TaskList";
import TaskInput from "./componentes/TaskInput";
import Footer from "./componentes/Footer";
import EmptyState from "./componentes/EmptyState";
import "./App.css";

// Definimos la estructura de la tarea (Requisito TypeScript)
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const fetchTasks = () => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Funcionalidad: Agregar tarea
  const addTask = (text: string) => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
    .then(() => {
      fetchTasks();
    })
    .catch((error) => {
      console.error("Error al crear tarea:", error);
    });
  };

  // Funcionalidad: Eliminar tarea
  const deleteTask = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      fetchTasks();
    })
    .catch((error) => {
      console.error("Error al crear tarea:", error);
    })
  };

  // Funcionalidad: Alterar el estado de la tarea
  const toggleTask = (id: number) => {
    const taskToToggle = tasks.find(t => t.id === id);
    if (!taskToToggle) return;

    fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // ENVIAMOS el estado opuesto al que tiene actualmente
      body: JSON.stringify({ completed: !taskToToggle.completed }),
    })
    .then(() => fetchTasks())
    .catch((error) => console.error("Error al actualizar:", error));
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length; // Cuenta cuántas tareas tienen completed: true
  const pending = total - completed;

  return (
    <div className="main-container">
      <main className="card">
        <Header />
        
        <TaskInput onAdd={addTask} />
        
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <TaskList 
            tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleTask} 
          />
        )}

        <Footer total={total} completed={completed} pending={pending} />
      </main>
    </div>
  );
}

export default App;