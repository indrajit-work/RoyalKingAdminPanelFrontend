import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie, getRole } from "../utils/auth";
import {
  Card,
  Container,
  Button,
  Col,
  Form,
  Row,
  FloatingLabel,
} from "react-bootstrap";

import ShowTable from "../components/ShowTable";

const AdjustPointsAdmin = () => {
  const [admins, setAdmins] = useState();
  const [transaction, setTransaction] = useState({
    receiverID: 0,
    amt: 0,
    senderID: 0,
    typeTrans: "",
    comment: ""
  });

  const {
    amt,
    receiverID,
    typeTrans,
    comment,
    senderID,
    userRoleSender,
    userRolereceiver,
  } = transaction;

  //current user
  const loggedUser = getCookie("token");
  console.log("logeed in", loggedUser);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    const res = await axios.post(
      "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getbyrole",
      {
        userRole: "ADMIN",
      }
    );

    setAdmins(res.data.adminsAll);
  };
  console.log(admins)

  //sendinng transaction details to lamda

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    setTransaction({
      ...transaction,
      [name]: e.target.value,
    });
  };
  console.log("before", transaction)

  const Transaction = async () => {
    if (parseInt(amt) <= 0) {
      alert("Enter correct Amount");
    }

    if (typeTrans === "") alert("Enter type of transfer(Adjust)");

    if (typeTrans === "substract") {
      let tempID = parseInt(receiverID);
      setTransaction({
        ...transaction,
        receiverID: parseInt(loggedUser),
        senderID: parseInt(tempID),
      });
    }

    console.log("after sub: ", transaction)
    
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/pointstransfer",
        {
          receiverID: receiverID,
          senderID: senderID,
          amount: parseInt(amt),
          comment: comment,
        }
      );

    setTransaction({
      ...transaction,
      receiverID: 0,
      amt: 0,
      senderID: 0,
      typeTrans: "",
      comment: ""
    })

      console.log("............", res);
    } catch (err) {
      console.log("Error from stokist adjust points:", err);
    }
  };

  return (
    <>
      <Container>
        <Card className="mt-5 w-100 shadow-lg">
          <Card.Header>
            <h2 className="text-center text-muted">Adjust points</h2>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted pb-2">Choose Admin</Card.Title>

            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid">
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={handleChange("receiverID")}
                  >
                    <option>Select below...</option>
                    {!admins ? (
                      <option>No data...</option>
                    ) : (
                      admins.map((item, index) => (
                        <option key={index} value={item.userID}>
                          {item.fullName} (balance:{item.balance})
                        </option>
                      ))
                    )}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md></Col>
              <br />

              <Card.Title className="text-muted mt-4">Adjust </Card.Title>
              <FloatingLabel controlId="floatingSelectGrid">
                <Form.Select
                  className="w-50"
                  aria-label="Floating label select example"
                  onChange={handleChange("typeTrans")}
                >
                  <option>Select below...</option>
                  <option value="substract">Substract</option>
                  <option value="add">Add</option>
                </Form.Select>
              </FloatingLabel>

              <Col md>
                <Card.Title className="text-muted mt-4">Amount</Card.Title>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Enter Amount..."
                >
                  <Form.Control type="number" onChange={handleChange("amt")} />
                </FloatingLabel>
              </Col>
              <Col md></Col>

              <Card.Title className="text-muted mt-4">Comment</Card.Title>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Leave a comment here(Optional)"
              >
                <Form.Control
                  className="w-50"
                  as="textarea"
                  placeholder="Leave a comment here(Optional)"
                  style={{ height: "80px" }}
                  onChange={handleChange("comment")}
                />
              </FloatingLabel>
              <Col md>
                {" "}
                <Button
                  onClick={Transaction}
                  className=" ml-3 pt-1 mt-2"
                  variant="secondary"
                  size="md"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />

        <br />
      </Container>

      <ShowTable />
    </>
  );
};
export default AdjustPointsAdmin;
