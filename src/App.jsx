import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HabitDetails from "./pages/HabitDetails";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={user ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/habit/:id"
          element={user ? <HabitDetails /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
