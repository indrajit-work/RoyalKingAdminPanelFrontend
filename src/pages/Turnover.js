import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminStokist from "./AdminStokist";
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
  //showing cal on clicking icon



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

  const dataSuper=[]
  
 useEffect(()=>{
  getAd();
 },[])


const getAd=async ()=>{
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

  try{
   const res=await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getgames",{
      createTime:value,
      gameType:type
    })
    console.log("Response",res)
  }catch(err){
    console.log("Error in game details",err);
  }
}
if(getAdmin)
 <AdminStokist adminInfo={getAdmin.admins.Items}/>
 
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
                <Form.Select onChange={gameTypeHandler} aria-label="Floating label select example">
                  <option>All</option>
                  <option value="cards16">Cards 16</option>
                  <option value="cards52">Cards 52</option>
                  <option value="jeetoJoker">jeetoJoker</option>
                  <option value="doubleChance">doubleChance</option>
                  <option value="singleChance">signleChance</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
            <span><label className="pr-2 text-muted ml-5">Start Date:</label></span>
            <input value={value} disabled className="mb-3 ml-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={calHandler} />
              </span>
              {showCal && <Calendar onChange={onChanage} value={value} />}
            </Col>
            <Col md>
            <span><label className="pr-2 text-muted ml-5">End Date:</label></span>
            <input value={value} disabled className="mb-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={EndHandler} />
              </span>
              {showCalEnd && <Calendar onChange={eonChanage} value={endValue} />}
            </Col>
            
            <Col md>
              
              <Button variant="secondary" type="submit" onClick={getGameData} >Search</Button>
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
            <th scope=" col ">Games played </th>
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
         // dataSuper.players.Items.map((item, index) => (
            <MDBTableBody >
              <tr>
                <td> SuperAdmin </td>
                <td> 0</td>
                <td>0</td>
                <td> 0 </td>
                <td> 0 </td>
              </tr>
            </MDBTableBody>
          )
        }
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
            <th scope=" col ">Games played </th>
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
                <td> <Link to={`/admin/stokist/${item.userID}/${item.commPercent}`}><Button variant="secondary" size="sm">{item.fullName} Admin</Button></Link> </td>
                <td> 0</td>
                <td>0</td>
                <td> 0 </td>
                <td> 0 </td>
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
