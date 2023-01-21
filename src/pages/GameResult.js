import React, { useState } from "react";
import axios from "axios";
import './GameResult.css'
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
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";

const GameResult = (props) => {
  const date=new Date();
  date.setHours(0,0,0,0)
  const date2=new Date();
  date2.setHours(23,59,59,59)

  const [value, onChanage] = useState(date);
  const [endValue, eonChanage] = useState(date2);
  const [showCal, setShowCal] = useState(false);
  const [showCalEnd,setshowCalEnd]=useState(false);
  const [type,setType]=useState();
  const[btnText,setbtn]=useState({
    btn:"Search"
  });

  const[id,setId]=useState("0");
  const [allGameData,setAllGameData]=useState()
  const {btn} =btnText
// const{win,played,commPercent,net,userID}=allGameData;
  //showing cal on clicking icon

  
  const calHandler = () => {
    setShowCal(!showCal);
  };
//console.log("...",value)

const EndHandler=()=>{
  setshowCalEnd(!showCalEnd)
}

const userIdHandler=(e)=>{
    setId(e.target.value);
}

  //..........................................................................................
// console.log(value);
// console.log(endValue)
 
//game selecter
const gameTypeHandler=(e)=>{
  setType(e.target.value);
}

const getGameData=async ()=>{
setbtn({
  btn:"Searching"
})
  try{
   const res=await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getgameresultv2",{
      startTime:value,
      endTime:endValue,
      gameType:type,
    })
    setAllGameData(res.data.history)
    setbtn({
      btn:"Search"
    })
    // console.log("Response",res)
  }catch(err){
    console.log(err);
  }
}

  return (
    <>
    <Container>
      <Card className="mt-4 w-100 shadow-lg">
        <Card.Header>
          <h4 className="text-center">Welcome Administrator</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-muted">Game Result</Card.Title>
            <br/>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid">
                <Form.Select onChange={gameTypeHandler} className="mb-3" aria-label="Floating label select example">
                  <option>Select from below...</option>
                  <option value="cards16">Cards 16</option>
                  <option value="cards52">Cards 52</option>
                  <option value="jeetoJoker">jeetoJoker</option>
                  <option value="doubleChance">doubleChance</option>
                  <option value="singleChance">signleChance</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
            <span><label className=" text-muted ml-5">Start Date:</label></span>
            <input value={value} disabled className=" ml-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={calHandler} />
              </span>
              {showCal && <Calendar onChange={onChanage} value={value} />}
            </Col>
            <Col md>
            <span><label className="pr-2 text-muted ml-5">End Date:</label></span>
            <input value={endValue} disabled className="mb-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={EndHandler} />
              </span>
              {showCalEnd && <Calendar onChange={eonChanage} value={endValue} />}
            </Col>
              <Button variant="secondary"  className="ml-3 mt-4 submitBTN" type="submit" onClick={getGameData} >{btn}</Button>
          </Row>
        </Card.Body>
      </Card>
    </Container>

    <MDBContainer>
      <div style={{ marginTop: "80px" }}>
    <MDBRow>
    <MDBCol size="12">
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope=" col ">Game id</th>
            <th scope=" col ">Draw Time</th>
            <th scope=" col ">Game Type</th>
            <th scope=" col ">Result</th>
          </tr>
        </MDBTableHead>

        {!allGameData? (
          <MDBTableBody className="align-center mb-8">
            <tr>
              <td colspan={8} className=" text-center mb-8">
                {" "}
                No Data Found{" "}
              </td>
            </tr>
          </MDBTableBody>
        ) 
        : (
            allGameData.map((item, index) => (
            <MDBTableBody >
              <tr>
                <td> {item.gameID}</td>
                <td>{item.drawTime}</td>
                <td>{item.gameType}</td>
                <td> {item.result}</td>
              </tr>
            </MDBTableBody>
          ))
        )}
 
      </MDBTable>
    </MDBCol>
  </MDBRow>
 </div>
</MDBContainer>
</>
  );
};

export default GameResult;
