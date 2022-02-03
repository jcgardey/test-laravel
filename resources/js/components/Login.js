import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify({ email, password });
        window.axios.post("/api/users", body).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/products");
        });
    };

    return (
        <div className="container">
            <h2>Ingresar</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button>Ingresar</button>
                </div>
            </form>
        </div>
    );
};
