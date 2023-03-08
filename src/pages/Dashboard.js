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
      {/* <Container>
        <Row>
          <Card
            bg="light"
            key="light"
            style={{ width: "50rem", height: "13rem" }}
            className="mb-2  mt-4"
          >
            <Card.Header className="text-center dashboard">
              <div>Online Players</div>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <h1 className="text-center mt-4 text-muted">{count}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container> */}

      <OnlineUsers />
    </>
  );
};

export default Dashboard;
