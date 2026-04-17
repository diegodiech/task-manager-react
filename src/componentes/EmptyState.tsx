import "./EmptyState.css";

const EmptyState = () => {
  return (
    <div className="empty-state-container">
      <div className="empty-icon">📝</div>
      <h3 className="empty-title">¡Todo al día!</h3>
      <p className="empty-subtitle">Parece que no tienes tareas pendientes. Agrega una arriba para empezar.</p>
    </div>
  );
};

export default EmptyState;