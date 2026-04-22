import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const API = process.env.REACT_APP_API_URL;

  // 🔥 Load user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get(`${API}/api/auth/me`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem("token"));
    }
  }, []);

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
        localStorage.setItem("token", res.data.token);

        const userRes = await axios.get(`${API}/api/auth/me`, {
          headers: {
            Authorization: res.data.token
          }
        });

        setUser(userRes.data);
      } else {
        alert("Signup successful 🎉");
        setIsLogin(true);
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔥 DASHBOARD UI
  if (user) {
    return (
      <div className="container">
        <div className="card">
          <h2>Welcome 🎉</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  // 🔥 AUTH UI
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