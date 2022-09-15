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
const StokistPlayer = () => {
  
 const[player,setPlayer]=useState();
//   useEffect(() => {
//     loadUserData();
//   }, []);

//*stokist Data
const[stokistInfo,setStokistInfo]=useState({
  played:0,
  win:0,
  stokNet:0,
  playerInfo:[]
})

const{played,win,stokNet,playersInfo}=stokistInfo;

//fteching params

const params=useParams();
const stokistId=params.userID;
const stokistcommPer=params.commPercent

useEffect(()=>{
 getStokistNetAndPlayed()   
   },[])
  
  
const getStokistNetAndPlayed= async ()=>{
  return  await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/stokistnet",{
    bossID:stokistId,
    commPercent:stokistcommPer
}).then((res)=> setStokistInfo({
  played:res.data.played,
  win:res.data.win,
  stokNet:res.data.stoknet,
  playersInfo:res.data.playersData
}))
.catch((err)=>console.log("Fetching stokist info",err))
}


//   const getSt = async()=>{
//     return  await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/fetchplayer",{
//       bossID:stokistId
//   }).then((res)=> setPlayer(res.data))
//   .catch((err)=>console.log(err))
//   }
//   //console.log("data:", data.users);

// console.log(player)



  return (
    <>
  
    <MDBContainer>
 
      <div style={{ marginTop: "80px" }}>
        <h1 className="text-center mb-5 text-muted"> Stokist </h1>
  
     {/* <input className="mb-2" placeholder="search..."  value={filterVal} onInput={(e)=>handleFilter(e)}/> */}
    
       
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">User Id</th>
                  <th scope=" col ">Played</th>
                  <th scope=" col ">Games Won </th>
                  <th scope=" col "> Commission </th>
                  <th scope=" col ">Net</th>
                  
                </tr>
              </MDBTableHead>
                 
                  <MDBTableBody key={stokistId}>
                    <tr>
                      <td> {stokistId} </td>
                      <td> {played} </td>
                      <td> {win} </td>
                      <td>{stokistcommPer}</td>
                      <td> {stokNet} </td>
                      
                    </tr>
                  </MDBTableBody>
             
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>


    <MDBContainer>
      <div style={{ marginTop: "80px" }}>
      <h1 className="text-center mb-5 text-muted"> Players </h1>
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

        {! playersInfo? (
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
            playersInfo.map((item, index) => (
            <MDBTableBody key={item.userID}>
              <tr>
                <td> {item.userID} </td>
                <td><Link to="#"><Button variant="secondary" size="sm">{item.fullName} (Player)</Button></Link>  </td>
                <td> {item.totPlayed}</td>
                <td>{item.totWin}</td>
                <td> {item.commPercent} </td>
                <td> {item.net} </td>
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

export default StokistPlayer;