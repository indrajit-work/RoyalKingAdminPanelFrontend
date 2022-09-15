import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Container,
  Button,
  Col,
  Form,
  Row,
  FloatingLabel,
} from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as AiIcons from "react-icons/ai";
import "./Icon.css";
import "./Turnover.css";

const GameSettings = (props) => {

const[state,setState]=useState({
    gameType:"Payout settings",
    payoutPercent:0,
    payoutMod:"",
    multiplier:0,
    btnText:"Submit"
})

const {gameType,multiplier,payoutPercent,payoutMod,btnText}=state
    const handleChange = (name) => (e) => {
        console.log(typeof(e.target.value));
        setState({
          ...state,
          [name]: e.target.value,
         
        });
      };
    

 const handleSubmit= async ()=>{
   

    if(parseInt(payoutPercent)===0)
    {
      alert("Payout Percent cannot be zero")
      return;
    }
 
    if( multiplier<1)
    {
        alert("select values in range 1-10");
        return;
    }

    setState({
        ...state,
        btnText:"Submitting",
    })
   console.log(state)
    try {
        const res = await axios.post(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gamesettings`,
          {
            gameType:gameType,
            payoutPercent:payoutPercent,
            multiplier:multiplier,
            payoutMod:payoutMod

          },
        );
  
        // console.log("Settings:...............", res);
        setState({
          gameType:"Payout Settings",
          payoutPercent:0,
            payoutMod:"",
          mutiplier:0,
          btnText: "Submited",

        });
       
      } catch (error) {
        console.log("Error:", error);
        setState({
          ...state,
          buttonText: "Submit",
         
        });
      }
  
 }

    
  return (
    <>
      <Container>
        <Card className="mt-4 w-100 shadow-lg">
          <Card.Header>
            <h4 className="text-center">Payout Settings</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">Choose Game Type</Card.Title>
            <br />

            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid">
                  <Form.Select onChange={handleChange("gameType")}  aria-label="Floating label select example">
                    <option value="cards16">Cards 16</option>
                    <option value="cards52">Cards 52</option>
                    <option value="jeetoJoker">jeetoJoker</option>
                    <option value="doubleChance">doubleChance</option>
                    <option value="singleChance">signleChance</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col md></Col>
            </Row>
          </Card.Body>
        </Card>
        <br />

        <Card className="mt-4 w-100 shadow-lg">
          <Card.Header>
            <h4 className="text-center">{gameType}</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">
              Enter Payout Percentage 
            </Card.Title>
            <br />

            <Row className="g-2">
              <Col md>
                <FloatingLabel  label="Enter Payout Percentage">
                  <Form.Control
                onChange={handleChange("payoutPercent")}
                    type="number"
                    placeholder="Enter values from -100 to 100"
                  />
                </FloatingLabel>
              </Col>
              <Col md> </Col>
              <h4 className="text-muted ml-4 mt-3 p-2 ">Payout Mode<small className="text-muted">(Select only one)</small></h4>
              <Form className="mt-2 ml-3" onChange={handleChange("payoutMod")}>
              <Form.Check  value="LowPayout"  type="radio" label="Low Payout Mode" />
              <Form.Check  value="MediumPayout" type="radio" label="Medium Payout Mode" />
              <Form.Check value="HighPayout" type="radio" label="High Payout Mode" />
              </Form>
             
            </Row>
          </Card.Body>
        </Card>

        <Card className="mt-4 w-100 shadow-lg">
          <Card.Header>
            <h4 className="text-center">{gameType}</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">Enter Multiplier</Card.Title>
            <br />

            <Row className="g-2">
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Select values from 1-10"
                >
                  <Form.Control
                    onChange={handleChange("multiplier")}
                    type="number"
                    placeholder="Enter values from -100 to 100"
                  />
                </FloatingLabel>
              </Col>

              <Col md>
              <Button className="float-right mr-4" onClick={handleSubmit} variant="secondary" size="lg">{btnText}</Button>
              </Col>
            </Row>
          </Card.Body>
           
        </Card>

        <br />
      </Container>
    </>
  );
};
export default GameSettings;
