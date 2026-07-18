import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
import { useTasks } from "../hooks/useTasks";

const TasksPage = () => {
  const { tasks, addTask, removeTask, toggleTask } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="main-container">
      <main className="card">
        <Header />
        <TaskInput onAdd={addTask} />
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <TaskList tasks={tasks} onDelete={removeTask} onToggle={toggleTask} />
        )}
        <Footer total={total} completed={completed} pending={pending} />
      </main>
    </div>
  );
};

export default TasksPage;
