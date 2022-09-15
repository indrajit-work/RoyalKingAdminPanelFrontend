import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
const DistributorStokist = () => {
  
 const[stokist,setStokist]=useState();
//   useEffect(() => {
//     loadUserData();
//   }, []);




//fteching params

const params=useParams();
const distributorID=params.userID;
const distributorcommPer=params.commPercent

useEffect(()=>{
 getSt()
        
   },[])
  
  
  const getSt = async()=>{
    return  await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/fetchstokists",{
      userRole:"STOKIST",
      bossID:distributorID
  }).then((res)=> setStokist(res.data))
  .catch((err)=>console.log(err))
  }
  //console.log("data:", data.users);


console.log(stokist)



  return (
    <>
    <MDBContainer>
      <div style={{ marginTop: "80px" }}>
        <h1 className="text-center mb-5 text-muted"> Distributor </h1>
  
     {/* <input className="mb-2" placeholder="search..."  value={filterVal} onInput={(e)=>handleFilter(e)}/> */}
    
       
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">User Id</th>
                  <th scope=" col "> Played  </th>
                  <th scope=" col ">Games Won </th>
                  <th scope=" col "> Commission </th>
                  <th scope=" col ">Net</th>
                  
                </tr>
              </MDBTableHead>
                 
                  <MDBTableBody key={distributorID}>
                    <tr>
                      <td> {distributorID} </td>
                      <td> 0 </td>
                      <td> 0 </td>
                      <td>{distributorcommPer}</td>
                      <td> 0 </td>
                      
                    </tr>
                  </MDBTableBody>
             
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>


    <MDBContainer>
      <div style={{ marginTop: "80px" }}>
      <h1 className="text-center mb-5 text-muted"> Stokist {} </h1>
    <MDBRow>
    <MDBCol size="12">
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope="col">User Id</th>
            <th scope=" col "> User Role </th>
            <th scope=" col ">Played </th>
            <th scope=" col "> win </th>
            <th scope=" col ">Commission percent(%)</th>
            <th scope=" col "> Net </th>
          </tr>
        </MDBTableHead>

        {! stokist? (
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
          stokist.stokists.Items.map((item, index) => (
            <MDBTableBody key={index}>
              <tr>
                <td> {item.userID} </td>
                <td><Link to={`/stokist/player/${item.userID}/${item.commPercent}`}><Button variant="secondary" size="sm">{item.fullName} (Stokist)</Button></Link>  </td>
                <td> 0</td>
                <td>0</td>
                <td> {item.commPercent} </td>
                <td> 0 </td>
              </tr>
            </MDBTableBody>
          ))
        )}
      </MDBTable>
    </MDBCol>
  </MDBRow>
 </div>
</MDBContainer></>
    
  );
};

export default DistributorStokist;