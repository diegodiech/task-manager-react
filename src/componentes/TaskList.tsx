import { Task } from "../App";
import TaskCard from "./TaskCard";
import "./TaskList.css";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskList = ({ tasks, onDelete, onToggle }: Props) => {
  return (
    <ul className="task-list-container">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </ul>
  );
};

export default TaskList;