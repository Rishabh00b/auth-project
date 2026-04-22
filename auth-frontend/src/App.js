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

  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const url = isLogin
      ? `${API}/api/auth/login`
      : `${API}/api/auth/register`;

    try {
      const res = await axios.post(url, form);

      if (isLogin) {
        alert("Login successful 🎉");
        console.log(res.data.token);

        // ✅ Save token (important for next step)
        localStorage.setItem("token", res.data.token);

      } else {
        alert("Signup successful 🎉");
      }

    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.msg || "Server error");
      } else {
        alert("Network Error ❌ (Check backend / CORS)");
      }
    }

    setLoading(false);
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
          {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="switch">
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default App;