import { useState } from "react";
import "./Login.css";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="login-container">
        <h2 className="login-title">Bienvenido</h2>
        <span className="header-badge">Validación JWT</span>
        
        <form className="login-form" onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="Usuario" 
            onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
            type="password" 
            placeholder="Contraseña" 
            onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="login-btn">ENTRAR</button>
        </form>
    </div>
  );
};

export default Login;