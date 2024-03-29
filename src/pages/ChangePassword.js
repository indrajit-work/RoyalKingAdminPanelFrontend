import React, { useState } from "react";
import { Card, Form, Button, Row, Container, Alert } from "react-bootstrap";
import "./ChagePassword.css";
import axios from "axios";
import { getCookie } from "../utils/auth";

const ChangePassword = () => {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    verifyPassword: "",
    buttonText: "Submit",
    succmsg: "",
    errmsg:""
  });

  const { oldPassword, newPassword, verifyPassword, buttonText ,succmsg,errmsg} = state;

  const userID=getCookie("token");
  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setState({
      ...state,
      [name]: e.target.value,
      succmsg: "",
      errmsg:"",
      buttonText: "Submit",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      buttonText: "Submitting....",
    });

    if (newPassword !== verifyPassword) {
      setState({
        ...state,
        buttonText: "Submit",
      });
      alert("New Password and Verify Password doesn't match");
      return;
    }

    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/resetpassword`,
        {
          userID: parseInt(userID),
          oldPassword,
          newPassword
        },
      );

      // console.log("Login:...............", res);
      setState({
        ...state,
        oldPassword: "",
        newPassword: "",
        verifyPassword: "",
        buttonText: "Submit",
        succmsg: res.data.msg,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Login",
        errmsg: error.response.data.msg,
      });
    }
  };
  
  return (
    <Container>
      <Row>
        <Card
          border="secondary"
          style={{ width: "50rem" }}
          className="m-auto mt-5 "
        >
          <Card.Header className="text-muted font-weight-bold">
            Change Passward
          </Card.Header>
          <Card.Body>
            {succmsg && <Alert variant="success">{succmsg}</Alert>}
            {errmsg && <Alert variant="danger">{errmsg}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicPassword" className="pb-2">
                <Form.Label className="text-muted font-weight-bold">
                  Old Password
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={handleChange("oldPassword")}
                  className="changePassS"
                  value={oldPassword}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="pb-2">
                <Form.Label className="text-muted font-weight-bold">
                  New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={handleChange("newPassword")}
                  className="changePassS"
                  value={newPassword}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-muted font-weight-bold">
                  Verify Password
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  className="changePassS"
                  onChange={handleChange("verifyPassword")}
                  value={verifyPassword}
                />
              </Form.Group>
              <Button size="sm" className="float-right mt-4 btn btnChange" type="submit">
                {buttonText}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ChangePassword;
