import "./Footer.css";

interface Props {
  total: number;
  completed: number;
  pending: number;
}

const Footer = ({ total, completed, pending }: Props) => {
  return (
    <footer className="task-footer">
      <div className="footer-divider"></div>
      
      {/* Nueva fila de etiquetas */}
      <div className="footer-stats-row">
        <span className="stat-tag">
          Pendientes: <span className="count-pending">{pending}</span>
        </span>
        <span className="stat-tag">
          Completadas: <span className="count-completed">{completed}</span>
        </span>
      </div>

      <div className="footer-content">
        <span className="task-count">
          Tienes <strong>{total}</strong> {total === 1 ? 'tarea' : 'tareas'} en total
        </span>
        <span className="footer-date">&copy;diegodiech</span>
      </div>
    </footer>
  );
};

export default Footer;