import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Modal,
} from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import * as AiIcons from "react-icons/ai";
import "./Icon.css";
import "./Turnover.css";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";

const TicketHistoryById = () => {
  const [ticket, setTicket] = useState();
  const [show, setShow] = useState(false);

  //temp state of bets
  const[bet,setBet]=useState();

  const handleClose = () => setShow(false);
  const handleShow = (betDetails) => {
    setShow(true);
    // setBet(betDetails)
    // console.log(betDetails)
  }

  const params = useParams();
  const userID = params.id;

  const startTime = params.value;
  const endTime = params.endValue;
  const gameType = params.type;

  useEffect(() => {
    getTicketHistory();
  }, []);


  const getTicketHistory = async () => {
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gettickethistory",
        {
          startTime: startTime,
          endTime: endTime,
          gameType: gameType,
          userID: userID,
        }
      );
      setTicket(res.data.ticketHistory);
       
      // console.log("Response", res.data.ticketHistory);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MDBContainer>
        <div style={{ marginTop: "80px" }}>
          <h1 className="text-muted text-center mb-4">
            Ticket History Details{" "}
          </h1>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope=" col "> Game id</th>
                    <th scope=" col ">Create Time</th>
                    <th scope=" col "> Ticket Status </th>
                    <th scope=" col "> played </th>
                    <th scope=" col "> win </th>
                    <th scope=" col "> Last Action </th>
                    <th scope=" col "> Ticket Id </th>
                    <th scope=" col "> User Id </th>
                    <th scope=" col "> Bets Details</th>
                  </tr>
                </MDBTableHead>

                {!ticket ? (
                  <MDBTableBody className="align-center mb-8">
                    <tr>
                      <td colspan={8} className=" text-center mb-8">
                        {" "}
                        No Data Found{" "}
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  ticket.map((item, index) => (
                    <MDBTableBody>
                      <tr>
                        <td> {item.gameID}</td>
                        <td>{item.createTime}</td>
                        <td>{item.ticketStatus}</td>
                        <td>{item.played}</td>
                        <td>{item.win}</td>
                        <td>{item.lastAction}</td>
                        <td>{item.ticketID}</td>
                        <td>{item.userID}</td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            onClick={(item)=>{
                              setBet(item.bets)
                              handleShow()
                            }}
                            size="sm"
                          >
                            Bets Info
                          </Button>
                        </td>
                      </tr>
                    </MDBTableBody>
                  ))
                )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope=" col ">Bet On</th>
                    <th scope=" col "> Bet Value</th>
                    <th scope=" col "> Win Amount </th>
                  </tr>
                </MDBTableHead>

                {!ticket  ? (
                  <MDBTableBody className="align-center mb-8">
                    <tr>
                      <td colspan={8} className=" text-center mb-8">
                        {" "}
                        No Data Found{" "}
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  ticket.map((item, index) => (
                    <MDBTableBody>
                      <tr>
                        <td>{item.bets[0].betOn}</td>
                       <td>{item.bets[0].betValue}</td>
                        <td>{item.bets[0].winAmount}</td>                        
                      </tr>
                    </MDBTableBody>
                  ))
                )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TicketHistoryById;
