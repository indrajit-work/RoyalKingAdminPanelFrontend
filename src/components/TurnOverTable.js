import axios from "axios";
import React, {useState, useEffect} from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const TurnOverTable = ({ userID, from, to, gameType, role, link }) => {
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState("")

  useEffect(() => {
    getSt();
  }, []);

  const getSt = async () => {
      setLoading('Loading...')
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/turnover",
        {
          userID: userID,
          from: from,
          to: to,
          gameType: gameType,
        }
      );
      setGameData(res.data.data);
    } catch (error) {
      console.log(error);
    }finally{
        setLoading('');
    }
  };
  return (
    <div>
        {
            loading !== '' ? (
                <p style={{display: 'grid', placeItems: 'center', margin: '0 auto', height: 'calc(100vh - 90px)', fontSize: '20px'}}>{loading}</p>
            ) :
            (
                <>
                    <MDBContainer>
                        <div style={{ marginTop: "80px" }}>
                        <MDBRow>
                            <MDBCol size="12">
                            <MDBTable>
                                <MDBTableHead dark>
                                <tr>
                                    <th scope=" col "> User Id </th>
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
                                ) : (
                                // games.map((item, index) => (
                                <MDBTableBody>
                                    <tr>
                                    <td>{userID}</td>
                                    <td>{gameData.totalPlayed}</td>
                                    <td>{gameData.totalWin}</td>
                                    <td>{gameData.comPercent}</td>
                                    <td>{gameData.netProfit}</td>
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
                        <h1 className="text-center mb-5 text-muted"> {role}s </h1>
                        <MDBRow>
                            <MDBCol size="12">
                            <MDBTable>
                                <MDBTableHead dark>
                                <tr>
                                    <th scope="col">User Id</th>
                                    <th scope=" col "> User Role </th>
                                    <th scope=" col ">Played </th>
                                    <th scope=" col "> Win </th>
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
                                ) : (
                                gameData?.childTurnOverArray.map((item, index) => (
                                    <MDBTableBody key={index}>
                                    <tr>
                                        <td>{item.userID}</td>
                                        <td>
                                        <Link to={`${link}${item.userID}/${from}-to-${to}/${gameType}`}>
                                            <Button disabled={!link} variant="secondary" size="sm">
                                                {item.fullName}({role})
                                            </Button>
                                        </Link>
                                        </td>
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
                    </MDBContainer>
                </>
            )
        }
    </div>
  );
};

export default TurnOverTable;
