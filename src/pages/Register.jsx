import { useState } from "react";
import "../css/register.css";

function Register()
{
    const handleRegister = (e) => {
        alert("Registration functionality is not implemented yet.");

    }

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-card">
                <h1>Register</h1>
                <input
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    required    
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    required    
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );

}

export default Register;