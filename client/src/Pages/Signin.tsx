import React, { useState } from "react";
import "../Styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Password:", password);
    axios
      .post("http://localhost:9000/signin", {
        name: name,
        pass: password,
      })
      .then((response) => {
        if (response.data !== "OK") {
          alert("Choose another name");
        } else {
          localStorage.setItem("name", name);
          localStorage.setItem("pass", password);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Create Account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        <a href="/login" className="link">
          Already have an account?
        </a>
      </div>
    </div>
  );
};

export default Signin;
