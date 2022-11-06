import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import "./Turnover.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";
import { getCookie, getRole } from "../utils/auth";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsCalendar3 } from "react-icons/bs";

const DataTable = styled.div`
  min-height: 500px;
  height: 80vh;
  padding: 0 5rem;
  margin: 3rem auto;
  @media (max-width: 768px) {
    height: 300px;
    padding: 0 1rem;
  }
`;



const Turnover2 = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const date2 = new Date();
  date2.setHours(23, 59, 59, 59);

  const [gameType, setGameType] = useState("All");
  const [from, setFrom] = useState(date);
  const [to, setTo] = useState(date2);
  const [userRole, setUserRole] = useState("");
  const [showCal, setShowCal] = useState(false);
  const [showCalEnd, setShowCalEnd] = useState(false);
  const [gameData, setGameData] = useState({});
  const [usersUnder, setUsersUnder] = useState([])
  const [loading, setLoading] = useState("");
  const [showTable, setShowTable] = useState(false)

  const loggedUser = getCookie("token");

  (async () => {
    const role = await getRole(loggedUser);
    setUserRole(role);
  })();

  const loggedUserTOCol = [
    { field: "userID", headerName: "User ID", width: 130 },
    { field: "userName", headerName: "Username", width: 180, sortable: false },
    { field: "totalPlayed", headerName: "Play Point", width: 150 },
    { field: "totalWin", headerName: "Win Point", width: 150 },
    {
      field: "",
      headerName: "End",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        return(
          <>{params.row.totalPlayed - params.row.totalWin}</>
        )
      }
    },
    { field: "comPercent", headerName: "Commission Amount", width: 180 },
    { field: "netProfit", headerName: "Net to Pay", width: 180 },
  ];

  const viewDetailsCol = [
    {
      field: "details",
      headerName: '',
      width: 130,
      sortable: false,
      renderCell : (params) => {
        if(userRole === "SUPERADMIN"){
          return(
            <Link to={`/admin/distributor/${params.row.userID}/${from}-to-${to}/${gameType}`}>
              <Button variant="secondary" size="sm">View Details</Button>
            </Link>
          )
        }
        if(userRole === "ADMIN"){
          return(
            <Link to={`/distributor/stokist/${params.row.userID}/${from}-to-${to}/${gameType}`}>
              <Button variant="secondary" size="sm">View Details</Button>
            </Link>
          )
        }
        if(userRole === "Distributor"){
          return(
            <Link to={`/stokist/player/${params.row.userID}/${from}-to-${to}/${gameType}`}>
              <Button variant="secondary" size="sm">View Details</Button>
            </Link>
          )
        }
        // if(userRole === "STOKIST"){
        //   return (
        //     <></>
        //   )
        // }
      }
    }
  ]

  const calHandler = () => {
    setShowCal(!showCal);
  };

  const EndHandler = () => {
    setShowCalEnd(!showCalEnd);
  };

  // search Handler
  const onSearchHandler = async (e) => {
    e.preventDefault();
    // console.log(loggedUser, "start:", from, "end", to, gameType);
    setLoading("Loading...");
    setShowTable(true)
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/turnover",
        {
          userID: parseInt(loggedUser),
          from: from,
          to: to,
          gameType: gameType,
        }
      );
      console.log(from);
      console.log(to);
      setGameData({id: parseInt(loggedUser), ...res.data?.data});
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
    } finally {
      setLoading("");
    }
  };
  // console.log(gameData);
  // console.log(usersUnder)
  // console.log(showTable);

  return (
    <>
      <form className="input-area" onSubmit={onSearchHandler}>
        <div className="input-field">
          <label>Game Type</label>
          <select name="gameType" onChange={(e) => setGameType(e.target.value)}>
            <option value="All" selected>All</option>
            <option value="cards16">Cards 16</option>
            <option value="cards52">Cards 52</option>
            <option value="jeetoJoker">jeetoJoker</option>
            <option value="doubleChance">doubleChance</option>
            <option value="singleChance">signleChance</option>
          </select>
        </div>

        <div className="input-field">
          <label>Start Date</label>
          <input value={from} disabled />
          <span className="iconStyle">
            <BsCalendar3 onClick={calHandler} />
          </span>
          {showCal && <Calendar onChange={setFrom} value={from} />}
          {/* <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          /> */}
        </div>

        <div className="input-field">
          <label>End Date</label>
          <input value={to} disabled />
          <span className="iconStyle">
            <BsCalendar3 onClick={EndHandler} />
          </span>
          {showCalEnd && <Calendar onChange={setTo} value={to} />}
          {/* <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          /> */}
        </div>
        <button>Search</button>
      </form>

      <table>
        <tr>
          <td>User Role</td>
          <td>{userRole}</td>
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
                    <th scope=" col "> User Role </th>
                    <th scope=" col ">Played </th>
                    <th scope=" col "> Win </th>
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
                      <td>{userRole}</td>
                      <td>{gameData.totalPlayed}</td>
                      <td>{gameData.totalWin}</td>
                      <td>{gameData.comPercent?.toFixed(2)}</td>
                      <td>{gameData?.netProfit?.toFixed(2)}</td>
                    </tr>
                  </MDBTableBody>
                )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer> */}

      {/* {show} */}
      {/* {showTable && loading !== "" &&
        <p style={{display: 'grid', placeItems: 'center', fontSize: '20px'}}>{loading}</p>
      }
      {
        showTable && loading !== "Loading..." &&
        <MDBContainer>
          <div style={{ marginTop: "80px" }}>
            <h1 className="text-center mb-5 text-muted">
              {userRole === "SUPERADMIN" && "Administrators"}
              {userRole === "ADMIN" && "Distributors"}
              {userRole === "Distributor" && "Stokists"}
              {userRole === "STOKIST" && "Players"}
            </h1>
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
                            {userRole === "SUPERADMIN" && (
                              <Link
                                to={`/admin/distributor/${item.userID}/${from}-to-${to}/${gameType}`}
                              >
                                <Button variant="secondary" size="sm">
                                  {item.fullName}(Admin)
                                </Button>
                              </Link>
                            )}
                            {userRole === "ADMIN" && (
                              <Link
                                to={`/distributor/stokist/${item.userID}/${from}-to-${to}/${gameType}`}
                              >
                                <Button variant="secondary" size="sm">
                                  {item.fullName}(Distributor)
                                </Button>
                                {item.fullName}({othersRole})
                              </Link>
                            )}
                            {userRole === "Distributor" && (
                              <Link
                                to={`/stokist/player/${item.userID}/${from}-to-${to}/${gameType}`}
                              >
                                <Button variant="secondary" size="sm">
                                  {item.fullName}(Stokist)
                                </Button>
                              </Link>
                            )}
                            {userRole === "STOKIST" && <p>Player</p>}
                          </td>
                          <td>{item.totalPlayed}</td>
                          <td>{item.totalWin}</td>
                          <td> {item.comPercent?.toFixed(2)}</td>
                          <td>{item?.netProfit?.toFixed(2)}</td>
                        </tr>
                      </MDBTableBody>
                    ))
                  )}
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBContainer>
      } */}

      {/* <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Role</th>
            <th>Played</th>
            <th>Win</th>
            <th>Commission Percent</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {gameData.childTurnOverArray?.map((user) => (
            <tr>
              <td>{user.userID}</td>
              <td>
                {userRole === "SUPERADMIN" && (
                  <Link
                    to={`/admin/distributor/${user.userID}/${from}-to-${to}/${gameType}`}
                  >
                    {user.fullName}({othersRole})
                  </Link>
                )}
                {userRole === "ADMIN" && (
                  <Link
                    to={`/distributor/stokist/${user.userID}/${from}-to-${to}/${gameType}`}
                  >
                    {user.fullName}({othersRole})
                  </Link>
                )}
                {userRole === "Distributor" && (
                  <Link
                    to={`/stokist/player/${user.userID}/${from}-to-${to}/${gameType}`}
                  >
                    {user.fullName}({othersRole})
                  </Link>
                )}
              </td>
              <td>{user.totalPlayed}</td>
              <td>{user.totalWin}</td>
              <td>{user.comPercent}</td>
              <td>{user.netProfit}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {showTable && loading !== "" &&
        <p style={{display: 'grid', placeItems: 'center', fontSize: '20px'}}>{loading}</p>
      }
      {showTable && loading !== "Loading..." && !gameData?.childTurnOverArray ? 
      <p style={{textAlign: 'center'}}>No Data Found</p> :
      <>
        <h1 className="text-center mt-5">
          {userRole === "SUPERADMIN" && "Administrators"}
          {userRole === "ADMIN" && "Distributors"}
          {userRole === "Distributor" && "Stokists"}
          {userRole === "STOKIST" && "Players"}
        </h1>
        <DataTable>
          <DataGrid
          rows={usersUnder}
          columns={loggedUserTOCol.concat(viewDetailsCol)}
          checkboxSelection={false}
          ></DataGrid>
        </DataTable>
      </>
      }
    </>
  );
};

export default Turnover2;
