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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import TransactionTable from "../components/TransactionTable";

const AdjustPointsAdmin = () => {
  const [admins, setAdmins] = useState();
  const [transactionType, setTransactionType] = useState("");
  const [comment, setComment] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState(0)
  const [amt, setAmt] = useState(0)

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


  const Transaction = async () => {
    if (parseInt(amt) <= 0) {
      alert("Enter correct Amount");
    }

    if (transactionType === "") alert("Enter type of transfer(Adjust)");
    
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/pointstransfer",
        {
          loggedUser: loggedUser,
          selectedPlayer: selectedPlayer,
          transactionType: transactionType,
          amount: parseInt(amt),
          comment: comment,
        }
      );

      console.log("............", res.data);
      if(res.data.startsWith("Not")){
        alert("Not enough balance to deduct")
        return
      }
      toast.success(`Points ${transactionType === "add" ? 'added': 'deducted'} successfully`)
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
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                  >
                    <option>Select below...</option>
                    {!admins ? (
                      <option>No data...</option>
                    ) : (
                      admins.map((item, index) => (
                        <option key={index} value={item.userID}>
                          {item.userName} (Balance:{item.balance})
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
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option>Select below...</option>
                  <option value="add">Add</option>
                  <option value="substract">Substract</option>
                </Form.Select>
              </FloatingLabel>

              <Col md>
                <Card.Title className="text-muted mt-4">Amount</Card.Title>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Enter Amount..."
                >
                  <Form.Control type="number" onChange={(e) => setAmt(e.target.value)} />
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
                  onChange={(e) => setComment(e.target.value)}
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
      <ToastContainer />

      <TransactionTable loggedUser={loggedUser} />
    </>
  );
};
export default AdjustPointsAdmin;
