import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = isLogin
      ? "https://auth-project-wzyx.onrender.com/api/auth/login"
      : "https://auth-project-wzyx.onrender.com/api/auth/register";

    try {
      setLoading(true);

      const res = await axios.post(url, form);

      // Save token if login
      if (isLogin && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert(
        isLogin
          ? "Login successful 🎉"
          : "User registered successfully ✅"
      );

      console.log("Response:", res.data);

    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);

      alert(
        err.response?.data?.msg ||
        err.response?.data ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Signup"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="switch"
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default App;