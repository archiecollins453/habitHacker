import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HabitDetails from "./pages/HabitDetails";
// import { useAuth } from "./hooks/useAuth"; // optional

function App() {
//   const { user } = useAuth(); // optional Firebase login

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path="/habit/:id" element={user ? <HabitDetails /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
