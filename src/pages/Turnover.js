import React, { useState ,useEffect} from "react";
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

import { fetchAdmin } from "../utils/fetchAdmins";




const Turnover = (props) => {
  const[getAdmin,setAdmins]=useState( );
  const [value, onChanage] = useState(new Date());
  const [endValue, eonChanage] = useState(new Date());
  const [showCal, setShowCal] = useState(false);
  const [showCalEnd,setshowCalEnd]=useState(false);
const [type,setType]=useState();
const[btnText,setbtn]=useState({
  btn:"Search"
});

const [allGameData,setAllGameData]=useState({
  played:0,
  win:0,
  commPercent:0,
  net:0,
  userID:0,
})
const {btn} =btnText
const{win,played,commPercent,net,userID,adminNet}=allGameData;
  //showing cal on clicking icon


useEffect(()=>{
  getAdminsData();
},[])
  //admins state

//const{admins}=getAdmin
  
  const calHandler = () => {
    setShowCal(!showCal);
  };
//console.log("...",value)

const EndHandler=()=>{
  setshowCalEnd(!showCalEnd)
}



  //..........................................................................................

 
  
console.log("TIMER",Date.parse(value));
console.log("TIMERend",Date.parse(endValue));

 

const getAdminsData=async ()=>{
  return  await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getsuperadmin",{
    userRole:"ADMIN"
}).then((res)=> setAdmins(res.data))
.catch((err)=>console.log(err))
}

//game selecter

const gameTypeHandler=(e)=>{
  //console.log(e.target.value);
  setType(e.target.value);
}





const getGameData=async ()=>{
setbtn({
  btn:"Searching"
})
console.log("Checking......",getAdmin.admins.Items[0].userID)
  try{
   const res=await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getgamesbytype",{
      startTime:value,
      endTime:endValue,
      gameType:type,
      userID: getAdmin.admins.Items[0].userID,
      commPercent: getAdmin.admins.Items[0].commPercent
    })
    setAllGameData({
      win:res.data.win,
      played:res.data.played,
      commPercent:res.data.superAdComm, //super Admins commission
      net:res.data.net,
      userID:res.data.userID,
      adminNet:res.data.adminNet
    })
    setbtn({
      btn:"Search"
    })
    console.log("Response",res)
  }catch(err){
    console.log("Error in game details",err);
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
          <Card.Title className="text-muted">Turnover Report Search</Card.Title>
          <br />

          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid">
                <Form.Select onChange={gameTypeHandler} className="mt-3" aria-label="Floating label select example">
                  <option>Select from below</option>
                  <option value="all">ALL</option>
                  <option value="cards16">Cards 16</option>
                  <option value="cards52">Cards 52</option>
                  <option value="jeetoJoker">jeetoJoker</option>
                  <option value="doubleChance">doubleChance</option>
                  <option value="singleChance">signleChance</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
            <span><label className="pl-3 text-muted ml-5">Start Date:</label></span>
            <input value={value} disabled className="mb-3 ml-5" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={calHandler} />
              </span>
              {showCal && <Calendar onChange={onChanage} value={value} />}
            </Col>
            <Col md>
            <span><label className="pl-3 text-muted ml-5">End Date:</label></span>
            <input value={endValue} disabled className="mb-3 ml-5" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={EndHandler} />
              </span>
              {showCalEnd && <Calendar onChange={eonChanage} value={endValue} />}
            </Col>
            
            <Col md>
              
              <Button variant="secondary" type="submit"  className=" ml-5" onClick={getGameData} >{btn}</Button>
            </Col>
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
            <th scope=" col "> User Role </th>
            <th scope=" col ">Played </th>
            <th scope=" col "> win </th>
            <th scope=" col ">Commission percent(%)</th>
            <th scope=" col "> Net </th>
          </tr>
        </MDBTableHead>

        {false ? (
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
          // games.map((item, index) => (
            <MDBTableBody >
              <tr>
                <td> SuperAdmin</td>
                <td>{played}</td>
                <td>{win}</td>
                <td> {commPercent}</td>
                <td> {net} </td>
              </tr>
            </MDBTableBody>
        // ))
        // )}
        )}
      </MDBTable>
    </MDBCol>
  </MDBRow>
 </div>
</MDBContainer>


<MDBContainer>
      <div style={{ marginTop: "80px" }}>
      
    <MDBRow>
    <MDBCol size="12">
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope="col">User Id</th>
            <th scope=" col "> User Role </th>
            <th scope=" col "> Played </th>
            <th scope=" col "> win </th>
            <th scope=" col ">Commission percent(%)</th>
            <th scope=" col "> Net </th>
          </tr>
        </MDBTableHead>

        {! getAdmin? (
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
          getAdmin.admins.Items.map((item, index) => (
            <MDBTableBody key={index}>
              <tr>
                <td> {item.userID} </td>
                <td> <Link to={`/admin/distributor/${item.userID}/${item.commPercent}`}><Button variant="secondary" size="sm">{item.fullName} ( Admin)</Button></Link> </td>
                <td> {win}</td>
                <td>{played}</td>
                <td> {item.commPercent}</td>
                <td> {adminNet} </td>
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

export default Turnover;
