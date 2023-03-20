import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import "./Dashbaord.css";
import { useHistory } from "react-router-dom";
import { isAuth } from "../utils/auth";
import axios from "axios";
import OnlineUsers from "../components/OnlineUsers";

const Dashboard = () => {
  const [count, setCount] = useState(0);

  const history = useHistory();

  if (!isAuth()) history.push("/login");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        ` https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getallusers`
      );
      setCount(
        res.data.users.filter(
          (user) => user.userStatus === "online" && user.userRole === "PLAYER"
        ).length
      );
      return res.data;
    };
    try {
      fetchData();
    } catch (error) {
      if (error.response.status === 401) {
        return { user: "no data" };
      }
    }
  }, []);

  return (
    <>
      <OnlineUsers />
    </>
  );
};

export default Dashboard;
