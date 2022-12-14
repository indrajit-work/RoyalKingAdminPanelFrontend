import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getCookie} from '../utils/auth'
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

import { Button } from "react-bootstrap";
const ShowTable = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  

const{role}=props;
console.log(role)

  const bossID=getCookie("token");
 console.log(bossID)

 useEffect(()=>{
  loadUserData();
 },[])
  const loadUserData = async () => {


   const res= await axios
      .post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gettransactions`,
        {
          userRole: role,
          bossID:bossID
        }
      )
     
        setData(res.data.users);

      }

// console.log(data)

 

  return (
    <MDBContainer>
      <div style={{ marginTop: "80px" }}>
        <h1 className="text-center mb-5 text-muted"> {role} </h1>

        {/* <input className="mb-2" placeholder="search..."  value={filterVal} onInput={(e)=>handleFilter(e)}/> */}

        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">Transaction Id</th>
                  <th scope=" col "> Amount</th>
                  <th scope=" col ">Operation</th>
                  <th scope=" col "> Transaction Date </th>
                  <th scope=" col ">userID</th>
                  <th scope=" col ">Comment</th>
            
                </tr>
              </MDBTableHead>

              {!data? (
                <MDBTableBody className="align-center mb-8">
                  <tr>
                    <td colspan={8} className=" text-center mb-8">
                      {" "}
                      Loading Transactions...{" "}
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <td> {item.transactionID} </td>
                      <td> {item.amount} </td>
                      <td> {item.operation} </td>
                      <td>{item.transactionDate}</td>
                      <td> {item.userID} </td>
                      <td> {item.comment} </td>
                   
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default ShowTable;
