import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HabitDetails from "./pages/HabitDetails";
import { useAuth } from "./hooks/useAuth"; // optional
import { BrowserRouter, Routes } from 'react-router-dom'

function App() {
  
  const {user} = useAuth();

  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element={<Login />}/>
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path="/habit/:id" element={user ? <HabitDetails /> : <Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
