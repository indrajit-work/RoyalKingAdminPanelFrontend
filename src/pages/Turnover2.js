import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Turnover.css";

import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";
import { getCookie, getRole } from "../utils/auth";
import { fetchTicketInfo } from "../utils/getTicketInfo";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const DataTable = styled.div`
  min-height: 500px;
  height: 80vh;
  padding: 0 3rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const loggedUserTOCol = [
  { field: "id", headerName: "User Role", width: 150 },
  { field: "played", headerName: "Played", width: 250 },
  { field: "win", headerName: "Win", width: 130 },
  { field: "commPercent", headerName: "Commission Percent", width: 130 },
  { field: "amount", headerName: "Net", width: 180 },
];

const Turnover2 = () => {
  const [users, setUsers] = useState();
  const [gameType, setGameType] = useState("All");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [commissionPercent, setCommissionPercent] = useState();
  const [tickets, setTickets] = useState([]);
  const [usersUnder, setUsersUnder] = useState([]);
  const [gameData, setGameData] = useState({});

  const loggedUser = getCookie("token");

  (async () => {
    const role = await getRole(loggedUser);
    setUserRole(role);
  })();

  let othersRole = "";
  if (userRole === "SUPERADMIN") {
    othersRole = "ADMIN";
  }
  if (userRole === "ADMIN") {
    othersRole = "Distributor";
  }
  if (userRole === "Distributor") {
    othersRole = "STOKIST";
  }
  if (userRole === "STOKIST") {
    othersRole = "PLAYER";
  }

  // search Handler
  const onSearchHandler = async (e) => {
    e.preventDefault();
    console.log(loggedUser, "start:", from, "end", to, gameType);
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
      console.log(res.data.data);
      setGameData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(gameData);

  return (
    <>
      <form className="input-area" onSubmit={onSearchHandler}>
        <div className="input-field">
          <label>Game Type</label>
          <select name="gameType" onChange={(e) => setGameType(e.target.value)}>
            <option value="All" selected>
              All
            </option>
            <option value="cards16">Cards 16</option>
            <option value="cards52">Cards 52</option>
            <option value="jeetoJoker">jeetoJoker</option>
            <option value="doubleChance">doubleChance</option>
            <option value="singleChance">signleChance</option>
          </select>
        </div>

        <div className="input-area">
          <div className="input-field">
            <label>Start Date</label>
            <input
              type="date"
              name="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>

        <div className="input-area">
          <div className="input-field">
            <label>End Date</label>
            <input
              type="date"
              name="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <button>Search</button>
      </form>

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
                ) : (
                  // games.map((item, index) => (
                  <MDBTableBody>
                    <tr>
                      <td>{userRole}</td>
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
          <h1 className="text-center mb-5 text-muted">
            {userRole === "SUPERADMIN" && 'Administrators'}
            {userRole === "ADMIN" && 'Distributors'}
            {userRole === "Distributor" && 'Stokists'}
            {userRole === "STOKIST" && 'Players'}
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
                              <Button variant="secondary" size="sm">{item.fullName}(Admin)</Button>
                            </Link>
                          )}
                          {userRole === "ADMIN" && (
                            <Link
                              to={`/distributor/stokist/${item.userID}/${from}-to-${to}/${gameType}`}
                            >
                              <Button variant="secondary" size="sm">{item.fullName}(Distributor)</Button>
                              {item.fullName}({othersRole})
                            </Link>
                          )}
                          {userRole === "Distributor" && (
                            <Link
                              to={`/stokist/player/${item.userID}/${from}-to-${to}/${gameType}`}
                            >
                              <Button variant="secondary" size="sm">{item.fullName}(Stokist)</Button>
                            </Link>
                          )}
                          {userRole === "STOKIST" && <p>Player</p>}  
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

      {/* <DataTable>
            <DataGrid
            rows={['df', 12, 45, 0, 2]}
            columns={loggedUserTOCol}
            checkboxSelection={false}
            ></DataGrid>
        </DataTable> */}
    </>
  );
};

export default Turnover2;
