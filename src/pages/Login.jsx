import { useState } from "react";
import "../css/login.css";
import Register from "./Register";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const testUser = "test@test.com";
    const testPass = "test";

    if (email === testUser && password === testPass) {
      setError("");
      onLogin({ email });
    } else {
      setError("Invalid email or password");
    }
  };

  const navigateToRegister = () => {
    window.location.href = "/register";
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h1>Habit Hacker</h1>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        <p className="register-text">
          Don’t have an account?{" "}
          <span onClick={navigateToRegister}>Register</span>
        </p>
      </form>
    </div>
  );
}
