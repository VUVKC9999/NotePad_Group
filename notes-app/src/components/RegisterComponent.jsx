import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerEndpoint } from "../endpoints/datafetch";

function RegisterComponent() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerEndpoint(username, password, email);
            if (response) {
                alert("Registration successful!");
                navigate("/login");
            }
            else{
                alert(response.message)
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Error during registration. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            autoComplete="off"
                            className="form-control rounded-0"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already have an account?</p>
                <button
                    className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default RegisterComponent;
