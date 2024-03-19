import React, { useContext } from 'react';
import axios from "axios";
import mycontext from '../Context/Context';
import { useNavigate, Link } from 'react-router-dom';
import "./Styles/Teacherlogin.css"

export default function Login() {
  const { teacherloginData, setteacherLogindata } = useContext(mycontext);
  const nav = useNavigate();
  console.log("lgindt", teacherloginData);

  const handleLoginChange = (key, value) => {
    setteacherLogindata({ ...teacherloginData, [key]: value });
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Teacher/login", teacherloginData);
      alert(response.data.message);
      localStorage.setItem("teacherID", response.data.tID);
      localStorage.setItem("teacherName", response.data.tname);
      localStorage.setItem("teacherClass", response.data.tclass);
      nav("/Home");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Teacher Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type='text'
          value={teacherloginData.email}
          placeholder='Email...'
          onChange={(e) => handleLoginChange("email", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Batch</label>
        <input
          type='text'
          value={teacherloginData.batch}
          placeholder='Batch...'
          onChange={(e) => handleLoginChange("batch", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type='password'
          value={teacherloginData.password}
          placeholder='Password...'
          onChange={(e) => handleLoginChange("password", e.target.value)}
        />
      </div>
      <button onClick={login}>Login</button>
      <div className="register-link">
        <Link to="/Tregister">Register</Link>
      </div>
    </div>
  );
}
