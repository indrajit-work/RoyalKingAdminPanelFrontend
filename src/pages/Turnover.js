import React, { useState } from "react";
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
const Turnover = () => {
  const [value, onChanage] = useState(new Date());
const[eVal,eOnChange]=useState(new Date());
  const [showCal, setShowCal] = useState(false);
const[showCalEnd,setShowCalEnd]=useState();
  //showing cal on clicking icon

  const calHandler = () => {
    setShowCal(true);
  };

  const calHandlerend=()=>{
    setShowCalEnd(true);
  }
  return (
    <Container>
      <Card className="mt-4 w-100 shadow-lg">
        <Card.Header>
          <h4 className="text-center">Welcome Administrator</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-muted">Turnover Report Search</Card.Title>
          <br />

          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid">
                <Form.Select aria-label="Floating label select example">
                  <option>All</option>
                  <option value="1">Cards 16</option>
                  <option value="2">Cards 52</option>
                  <option value="3">jeetoJoker</option>
                  <option value="4">doubleChance</option>
                  <option value="5">signleChance</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
            <span><label className="pl-3 text-muted">Start Date:</label></span>
            <input value={value} disabled className="mb-3 ml-5" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={calHandler} />
              </span>
              {showCal && <Calendar onChange={onChanage} value={value} />}
            </Col>
            <Col md>
            <span><label className="pr-2 text-muted">End Date:</label></span>
            <input value={value} disabled className="mb-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={calHandlerend} />
              </span>
              {showCalEnd && <Calendar onChange={eOnChange} value={eVal} />}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Turnover;
