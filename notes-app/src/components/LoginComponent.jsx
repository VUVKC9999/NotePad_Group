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
            // else{
            //     alert(response.message)
            // }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Usename"
                            className="form-control rounded-0"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <button type="submit" className="btn btn-primary w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p>Don't have an account?</p>
                <button
                    className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default LoginComponent;
