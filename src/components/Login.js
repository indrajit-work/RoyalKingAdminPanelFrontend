import React from "react";
import profile from "../images/royalKing.png";
import "./Login.css";
import axios from "axios";
import {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { authenticate } from "../utils/auth";
import { isAuth } from "../utils/auth";
  const Login = () => {
    const [regState, setRegState] = useState({
      userName: "",
      password: "",
      msg: "",
      success: "",
      buttonText: "Login",
    });
  
    const { buttonText, success, password, msg, userName } = regState;
    const history = useHistory();
  
    useEffect(() => {
      isAuth() && history.push('/')
    }, []);
  
    const handleChange = (name) => (e) => {
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
        console.log(userName, password);
        const res = await axios.post(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin?task=login`,
          {
            userName: userName,
            password: password,
          })
          console.log(res)
  
        setRegState({
          ...regState,
          buttonText: "Login",
          msg: res.data.msg,
        });
        if(res.data?.msg === 'Success'){
          authenticate(res, () => {
            return history.push("/");
         });
        }
        
      } catch (error) {
        console.log("Error:", error);
        setRegState({
          ...regState,
          buttonText: "Login",
          msg: error.response?.data?.msg,
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
                placeholder="Enter UserName..."
                className="name inputLogin"
                onChange={handleChange("userName")}
                value={userName}
                required
              />
            </div>
            <div className="second-input">
              <input
                type="password"
                placeholder="Enter password..."
                className="name inputLogin"
                onChange={handleChange("password")}
                value={password}
                required
                autocomplete="off"
              />
            </div>
            <div className="login-button">
              <button className="login-btn btnS ">{buttonText}</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
