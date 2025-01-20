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
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <h2 className="text-center text-success mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              autoComplete="off"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-success w-100 mb-3">
            Register
          </button>
        </form>
        <p className="text-center mb-3">Already have an account?</p>
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterComponent;
