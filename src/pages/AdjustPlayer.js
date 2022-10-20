import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie, getRole } from "../utils/auth";
import ShowTable from "../components/ShowTable";
import {
  Card,
  Container,
  Button,
  Col,
  Form,
  Row,
  FloatingLabel,
} from "react-bootstrap";

const AdjustPlayer = () => {
  const [players, setPlayers] = useState();

  const [senderID, setSenderID] = useState(0)
  const [receiverID, setReceiverID] = useState(0)
  const [amt, setAmt] = useState(0)
  const [transactionType, setTransactionType] = useState("")
  const [comment, setComment] = useState("")

  const [selectedPlayer, setSelectedPlayer] = useState(0)

  // const [transaction, setTransaction] = useState({
  //   receiverID: 0,
  //   amt: 0,
  //   senderID: 0,
  //   typeTrans: "",
  //   comment: "",
  //   userRolereceiver: "PLAYER",
  //   userRoleSender: "",
  // });

  //current user
  const loggedUser = getCookie("token");
  // console.log("logeed in", loggedUser);
  const userRole = getRole(loggedUser);
  // console.log("ROLE", userRole);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    const res = await axios.post(
      "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getbyrole",
      {
        userRole: "PLAYER",
      }
    );
    console.log("getAdmins ",res.data)
    setPlayers(res.data.adminsAll);
  };

  //sendinng transaction details to lamda
  // const handleChange = (name) => (e) => {
  //   setTransaction({
  //     ...transaction,
  //     [name]: e.target.value,
  //   });
  // };

  const Transaction = async () => {
    if (parseInt(amt) <= 0) {
      alert("Enter correct Amount");
    }
    if (transactionType === "") alert("Enter type of transfer(Adjust)");


    if (transactionType === "substract") {
      setSenderID(selectedPlayer)
      setReceiverID(loggedUser)

      // console.log(`loggedUser ${loggedUser} senderID ${senderID} ReceiverID ${receiverID} selectedPlayer ${selectedPlayer} - sub:`)
    } else {
      setSenderID(loggedUser)
      setReceiverID(selectedPlayer)

      // console.log(`loggedUser ${loggedUser} senderID ${senderID} ReceiverID ${receiverID} selectedPlayer ${selectedPlayer} - sub:`)
    }

    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/pointstransfer",
        {
          loggedUser: loggedUser,
          selectedPlayer: selectedPlayer,
          transactionType: transactionType,
          amount: parseInt(amt),
          comment: comment
        }
      );

      setSenderID(0)
      setReceiverID(0)
      setTransactionType("")
      setAmt(0)
      setComment("submitted")

      // setTransaction({
      //   ...transaction,
      //   receiverID: 0,
      //   amt: 0,
      //   senderID: 0,
      //   typeTrans: "",
      //   comment: ""
      // });
      console.log("............", res.data);
      console.log("loggedUser, senderID, ReceiverID, selectedPlayer", loggedUser, senderID, receiverID, selectedPlayer)
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
            <Card.Title className="text-muted pb-2">Choose Player</Card.Title>

            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid">
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    value={selectedPlayer}
                  >
                    <option>Select below...</option>
                    {!players ? (
                      <option>No data...</option>
                    ) : (
                      players.map((item, index) => (
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
                  onChange={(e) => setTransactionType(e.target.value)}
                  value={transactionType}
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
                  <Form.Control type="number" onChange={(e) => setAmt(e.target.value)} value={amt} />
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
                  value={comment}
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
export default AdjustPlayer;
