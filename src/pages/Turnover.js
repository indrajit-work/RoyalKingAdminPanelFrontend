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
const[eVal,eOnChange]=useState(new Date());
  const [showCal, setShowCal] = useState(false);
const[showCalEnd,setShowCalEnd]=useState();
  //showing cal on clicking icon



  //admins state

//const{admins}=getAdmin
  
  const calHandler = () => {
    setShowCal(true);
  };

  const calHandlerend=()=>{
    setShowCalEnd(true);
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

 console.log("........",getAdmin)
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
            <span><label className="pr-2 text-muted ml-5">Start Date:</label></span>
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
                <td> <Link to="#"><Button variant="secondary" size="sm">{item.fullName}</Button></Link> </td>
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
