import React from "react";
import profile from "../images/man.png";
import "./Login.css";
import axios from "axios";
import {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { authenticate } from "../utils/auth";
import { isAuth } from "../utils/auth";
  const Login = () => {
    const [regState, setRegState] = useState({
      username: "2",
      password: "sdfsdfs",
      msg: "",
      success: "",
      buttonText: "Login",
    });
  
    const { buttonText, success, password, msg, username } = regState;
    const history = useHistory();
  
    // useEffect(() => {
    //   isAuth() && history.push('/')
    // }, []);
  
    const handleChange = (name) => (e) => {
      console.log(e.target.value);
      setRegState({
        ...regState,
        [name]: e.target.value,
        msg: "",
        success: "",
        buttonText: "Login",
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setRegState({ ...regState, buttonText: "Logging in...." });
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/users/login/admin`,
          {
            userID: parseInt(username),
            password: password,
          },
        );
  
        // console.log("Login:...............", res);
        setRegState({
          ...regState,
          buttonText: "Login",
          msg: res.data.msg,
        });
        authenticate(res, () => {
         return history.push("/");
        });
      } catch (error) {
        console.log("Error:", error);
        setRegState({
          ...regState,
          buttonText: "Login",
          msg: error.response.data.msg,
        });
      }
    };
  

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
          <div>
            <h1>Login</h1>
            <div>
            {msg && <Alert variant="danger">{msg}</Alert>}

              <input
                type="text"
                placeholder="Enter Username..."
                className="name"
                onChange={handleChange("username")}
                value={username}
                required
              />
            </div>
            <div className="second-input">
              <input
                type="password"
                placeholder="Enter password..."
                className="name"
                onChange={handleChange("password")}
                value={password}
                required
                autocomplete="off"
              />
            </div>
            <div className="login-button">
              <button className="login-btn">{buttonText}</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
