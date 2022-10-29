import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Broadcast.css'
import {
  Card,
  Container,
  Button,
  Col,
  Form,
  Row,
  FloatingLabel,
  InputGroup
} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import "./Turnover.css";
const Broadcast = () => {

    const[msg,setMsg]=useState("");
    const[btn,setBtn]=useState("Send")
    const handleChange=(e)=>{
        setMsg(e.target.value)
    }
    const sendHandler=async ()=>{

        if(msg==="")
        {
            alert("Message cannot be empty");
            return;
        }
        setBtn("Sending...")
        const res=await axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/broadcastmsg",{
            message:msg
        })
        setBtn("Sent")
        console.log(res);
    }
    
  return (
    <>
      <Container>
        <Card className="mt-5 w-100 shadow-lg">
          <Card.Header>
            <h3 className="text-center text-muted">Broadcast Message</h3>
       <br/>

           
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted"></Card.Title>

            <Row className="g-2">
              <Col md>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Enter Text
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                  onChange={handleChange}
                  value={msg}
                    placeholder="Type here..."
                    aria-label="Type here.."
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">
                  <AiIcons.AiOutlineMessage />
                  </InputGroup.Text>
                  <Button className="p-2 ml-3 broadcastBtn" onClick={sendHandler}>{btn}</Button>
                </InputGroup>
             
                <Form.Text id="passwordHelpBlock" muted>
              Please enter you broadcasting message in the space below. Hit
              "SEND" button to send the message immediately, which will be
              displayed in the lobby.
            </Form.Text>
              </Col>

              
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Broadcast;
