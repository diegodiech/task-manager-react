import { useState } from "react";
import { esTextoDeTareaValido } from "../utils/validaciones";
import "./TaskInput.css";

interface Props {
  onAdd: (text: string) => void;
}

const sinLabelVisible: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const TaskInput = ({ onAdd }: Props) => {
  const [text, setText] = useState("");
  // Estado para el error
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!esTextoDeTareaValido(text)) {
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
        <label htmlFor="task-input" style={sinLabelVisible}>
          Nueva tarea
        </label>
        <input
          id="task-input"
          className="task-input"
          type="text"
          placeholder="¿Qué planeas hacer hoy?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(false); // Quitamos el error mientras el usuario escribe
          }}
        />
        <button className="task-submit-btn" type="submit" aria-label="Agregar">
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