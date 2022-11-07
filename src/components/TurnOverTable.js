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
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

const DataTable = styled.div`
  min-height: 500px;
  height: 90vh;
  padding: 0 5rem;
  margin: 3rem auto;
  @media (max-width: 768px) {
    height: 500px;
    padding: 0 1rem;
  }
`;

const loggedUserTOCol = [
    { field: "userID", headerName: "User ID", minWidth: 80, flex: 1 },
    { field: "userName", headerName: "Username", minWidth: 100, flex: 1 },
    { field: "totalPlayed", headerName: "Play Point", minWidth: 120, flex: 1 },
    { field: "totalWin", headerName: "Win Point", minWidth: 120, flex: 1 },
    {
      field: "",
      headerName: "End",
      minWidth: 120,
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return(
          <>{params.row.totalPlayed - params.row.totalWin}</>
        )
      }
    },
    { field: "comPercent", headerName: "Commission Amount", minWidth: 160, flex: 1 },
    { field: "netProfit", headerName: "Net to Pay", minWidth: 120, flex: 1 },
  ];

const TurnOverTable = ({ userID, from, to, gameType, role, link }) => {
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState("")
  const [usersUnder, setUsersUnder] = useState([])

  const viewDetailsCol = [
    {
      field: "details",
      headerName: '',
      width: 130,
      sortable: false,
      renderCell: (params) => {
        return(
          <Link to={`${link}${params.row.userID}/${from}-to-${to}/${gameType}`}>
            <Button disabled={!link} variant="secondary" size="sm">View Details</Button>
          </Link>
        )
      }
    }
  ]

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
      setGameData(res.data?.data);
      setUsersUnder(res.data?.data?.childTurnOverArray.map(user => {
        return{
          id: user.userID,
          comPercent: user.comPercent.toFixed(2),
          netProfit: user.netProfit.toFixed(2),
          ...user,
        }
      }))
    } catch (error) {
      console.log(error);
    }finally{
        setLoading('');
    }
  };
  // console.log(usersUnder)

  return (
    <div>
        {
            loading !== '' ? (
                <p style={{display: 'grid', placeItems: 'center', margin: '0 auto', height: 'calc(100vh - 90px)', fontSize: '20px'}}>{loading}</p>
            ) :
            (
                <>
                    <table>
                        <tr>
                            <td>User ID</td>
                            <td>{userID}</td>
                        </tr>
                        <tr>
                            <td>Play Point</td>
                            <td>{gameData.totalPlayed}</td>
                        </tr>
                        <tr>
                            <td>Win Point</td>
                            <td>{gameData.totalWin}</td>
                        </tr>
                        <tr>
                            <td>Commission Amount</td>
                            <td>{gameData?.comPercent?.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Net to Pay</td>
                            <td>{gameData?.netProfit?.toFixed(2)}</td>
                        </tr>
                    </table>
                    {/* <MDBContainer>
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
                                <MDBTableBody>
                                    <tr>
                                    <td>{userID}</td>
                                    <td>{gameData.totalPlayed}</td>
                                    <td>{gameData.totalWin}</td>
                                    <td>{gameData.comPercent}</td>
                                    <td>{gameData?.netProfit?.toFixed(2)}</td>
                                    </tr>
                                </MDBTableBody>
                                )}
                            </MDBTable>
                            </MDBCol>
                        </MDBRow>
                        </div>
                    </MDBContainer> */}

                    {/* <MDBContainer>
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
                                        <td>{item?.netProfit?.toFixed(2)}</td>
                                    </tr>
                                    </MDBTableBody>
                                ))
                                )}
                            </MDBTable>
                            </MDBCol>
                        </MDBRow>
                        </div>
                    </MDBContainer> */}

                    <h1 className="text-center mt-5">{role}s</h1>
                    <DataTable>
                        <DataGrid
                        rows={usersUnder}
                        columns={loggedUserTOCol.concat(viewDetailsCol)}
                        checkboxSelection={false}
                        pageSize={25}
                        ></DataGrid>
                    </DataTable>
                </>
            )
        }
    </div>
  );
};

export default TurnOverTable;