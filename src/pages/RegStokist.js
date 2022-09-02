import React, { useState } from "react";
import { Card, Form, Button, Row, Container, Alert } from "react-bootstrap";
import "./RegDis.css";
import axios from "axios";
import { getCookie } from "../utils/auth";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
const RegStokist = () => {
    const [value, onChange] = useState(new Date());

   console.log(value)
  return (
    <Container>
      <Row>
        <Card
          border="secondary"
          style={{ width: "68rem" }}
          className="m-auto mt-5  shadow-lg"
        >
          <Card.Header className="text-muted font-weight-bold">
            Register new User
          </Card.Header>
          <Card.Body>
            <h4 className="text-muted text-center">Login Info</h4>
            <Form onSubmit="">
              <Form.Group controlId="formBasicPassword" className="pb-2">
                <Form.Label className="text-muted font-weight-bold">
                  Email
                </Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="pb-2">
                <Form.Label className="text-muted font-weight-bold">
                  Password
                </Form.Label>
                <Form.Control type="password" required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-muted font-weight-bold">
                  Verify Password
                </Form.Label>
                <Form.Control type="password" required />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-2">
                  Players
                </Form.Label>
                <Form.Control as="select" className="disable" disabled>
                  <option>Player1</option>
                </Form.Control>
              </Form.Group>

              {/* <Form.Group> */}
                <Form.Label className="text-muted font-weight-bold pt-2">
                  Role
                </Form.Label>
                <Form.Control as="select" className="disable" disabled>
                  <option>Stokist</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Commision percentage(%)
                </Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
            
              <br />
              <br />
              <hr style={{ color: "black" }} />
              <h4 className="text-muted text-center">Personal Info</h4>
              <hr style={{ color: "black" }} />
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Full Name
                </Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Phone Number
                </Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
              <Form.Label className="text-muted font-weight-bold pt-3 pb-3">
                Date Of Birth
                </Form.Label>
              <Calendar onChange={onChange} value={value}/>
              
            
              <Button
                size="sm"
                className="float-right mt-4 btn btnChange"
                type="submit"
              >
                {"Hello"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default RegStokist;
