import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEndpoint } from "../endpoints/datafetch";

function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginEndpoint(username, password);
            if (response) {
                alert("Login successful!");
                navigate("/dashboard");
            }
            else{
                console.log(response)
                alert(response.message)
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
                <h2 className="text-center text-primary mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Login
                    </button>
                </form>
                <p className="text-center mb-3">Don't have an account?</p>
                <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            </div>
        </div>
    );
}    

export default LoginComponent;
