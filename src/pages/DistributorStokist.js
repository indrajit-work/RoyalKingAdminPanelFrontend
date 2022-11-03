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
import TurnOverTable from "../components/TurnOverTable";

const DistributorStokist = () => {
  const[gameData , setGameData] = useState({});

  const params = useParams();

  const userID = params.userID;
  const gameType = params.gameType
  const from = params.from
  const to = params.to
  
  // useEffect(() => {
  //   const getSt = async () => {
  //     try {
  //       const res = await axios.post(
  //         "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/turnover",
  //         {
  //           userID: userID,
  //           from: from,
  //           to: to,
  //           gameType: gameType
  //         })
  //       console.log(res.data)
  //       setGameData(res.data.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   getSt()
  // }, [])
  
  console.log("dist-stok ", userID, from, to, gameType)
  // console.log("......", gameData)

  return (
    <>
    {/* <MDBContainer>
      <div style={{ marginTop: "80px" }}>
        <h1 className="text-center mb-5 text-muted"> Distributor </h1>

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
                 
                <MDBTableBody key={userID}>
                  <tr>
                    <td>{userID}</td>
                    <td>{gameData.totalPlayed}</td>
                    <td>{gameData.totalWin}</td>
                    <td>{gameData.comPercent}</td>
                    <td>{gameData.netProfit}</td> 
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

        {!gameData?.childTurnOverArray ? (
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
          gameData?.childTurnOverArray.map((item, index) => (
            <MDBTableBody key={index}>
              <tr>
                <td>{item.userID} </td>
                <td><Link to={`/stokist/player/${item.userID}/${from}-to-${to}/${gameType}`}><Button variant="secondary" size="sm">{item.fullName} (Stokist)</Button></Link>  </td>
                <td>{item.totalPlayed}</td>
                <td>{item.totalWin}</td>
                <td> {item.comPercent}</td>
                <td>{item.netProfit}</td>
              </tr>
            </MDBTableBody>
          ))
        )}
      </MDBTable>
    </MDBCol>
  </MDBRow>
 </div>
</MDBContainer> */}

  <TurnOverTable userID={userID} from={from} to={to} gameType={gameType} role='Stokist' link={`/stokist/player/`} />
</>
    
  );
};

export default DistributorStokist;