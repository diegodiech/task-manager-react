import { useEffect, useState } from "react";
import Header from "./componentes/Header";
import TaskList from "./componentes/TaskList";
import TaskInput from "./componentes/TaskInput";
import Footer from "./componentes/Footer";
import EmptyState from "./componentes/EmptyState";
import Login from "./componentes/Login";
import "./App.css";


// Definimos la estructura de la tarea (Requisito TypeScript)
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // JWT Nuevo estado para el token
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  
  const fetchTasks = () => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  };

  //JWT cambio para el token
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // JWT Logins token
  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };  

  // Funcionalidad: Agregar tarea
  const addTask = (text: string) => {
    fetch("http://localhost:3000/tasks", {
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
    fetch(`http://localhost:3000/tasks/${id}`, {
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

    fetch(`http://localhost:3000/tasks/${id}`, {
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

  // JWT aplication page
  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="main-container" >
      <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
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