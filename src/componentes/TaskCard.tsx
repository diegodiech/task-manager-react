import { Task } from "../App";
import "./TaskCard.css";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskCard = ({ task, onDelete, onToggle }: Props) => {
  return (
    <li className={`task-card-item ${task.completed ? "is-completed" : ""}`}>
      <div className="task-content" onClick={() => onToggle(task.id)}>
        <div className="checkbox-custom">
          {task.completed && <span className="check-icon">✓</span>}
        </div>
        <span className="task-text">{task.text}</span>
      </div>
      
      <button 
        className="delete-action-btn" 
        onClick={() => onDelete(task.id)}
        title="Eliminar tarea"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </li>
  );
};

export default TaskCard;