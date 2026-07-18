import { useState } from "react";
import "./TaskInput.css";

interface Props {
  onAdd: (text: string) => void;
}

const TaskInput = ({ onAdd }: Props) => {
  const [text, setText] = useState("");
  // Estado para el error
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validamos: si después de quitar espacios está vacío...
    if (text.trim() === "") {
      setError(true); // Activamos el error
      return; // Detenemos la ejecución
    }

    // Si hay texto, procedemos normalmente
    onAdd(text);
    setText("");
    setError(false); // Limpiamos el error si existía
  };

  return (
    <div className="task-input-container">
      <form className={`task-form ${error ? "input-error" : ""}`} onSubmit={handleSubmit}>
        <input 
          className="task-input"
          type="text" 
          placeholder="¿Qué planeas hacer hoy?" 
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(false); // Quitamos el error mientras el usuario escribe
          }} 
        />
        <button className="task-submit-btn" type="submit">
          <span>+</span>
        </button>
      </form>
      
      {/* Mensaje de error condicional */}
      {error && (
        <p className="error-message">⚠️ No se pueden agregar tareas vacías</p>
      )}
    </div>
  );
};

export default TaskInput;