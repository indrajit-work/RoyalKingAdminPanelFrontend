import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import "./Turnover.css";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { getCookie, getRole } from "../utils/auth";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsCalendar3 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import moment from "moment/moment";

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
  date2.setHours(0, 0, 0, 0);

  const [gameType, setGameType] = useState("All");
  // const [from, setFrom] = useState(date);
  // const [to, setTo] = useState(date2);
  const [userRole, setUserRole] = useState("");
  // const [showCal, setShowCal] = useState(false);
  // const [showCalEnd, setShowCalEnd] = useState(false);
  const [gameData, setGameData] = useState({});
  const [usersUnder, setUsersUnder] = useState([])
  const [loading, setLoading] = useState("");
  const [showTable, setShowTable] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startRange, setStartRange] = useState(null)
  const [endRange, setEndRange] = useState()
  const [selectDate, setSelectDate] = useState('')
  // const [startLastMonth, setStartLastMonth] = useState()
  // const [endLastMonth, setEndLastMonth] = useState()

  const datePickerHandler = () => {
    setShowDatePicker((prevState) => !prevState)
  }

  const [startDate, setStartDate] = useState(date)
  const [endDate, setEndDate] = useState(date2)

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  const handleSelect = (ranges) => {
    // console.log("ranges", ranges)
    setSelectDate('')
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }


  // console.log(startDate, endDate)
  let startMom = moment(startDate).format('ddd DD MMM YYYY HH:mm:ss')
  startMom = moment(startMom)
  // console.log(startMom)
  let endMom = moment(endDate).add(1, 'days').subtract(1, 'seconds').format('ddd DD MMM YYYY HH:mm:ss')
  endMom = moment(endMom)
  // console.log(endMom)

  const handleLastWeek = (e) => {
    // console.log(e.target.value)
    setSelectDate(e.target.value)

    if(e.target.value === 'lastweek'){
      let startMom = moment(date).subtract(7, 'days').format('ddd DD MMM YYYY HH:mm:ss')
      setStartRange(startMom)
      let endMom = moment(date).subtract(1, 'seconds').format('ddd DD MMM YYYY HH:mm:ss')
      setEndRange(endMom)
    }

    if(e.target.value === 'lastmonth'){
      let startMom = moment(date).subtract(30, 'days').format('ddd DD MMM YYYY HH:mm:ss')
      setStartRange(startMom)
      let endMom = moment(date).subtract(1, 'seconds').format('ddd DD MMM YYYY HH:mm:ss')
      setEndRange(endMom)
    }
  }
  // console.log("range", startRange, endRange)
  const printStart = moment(startRange).format('DD.M.YYYY')
  const printEnd = moment(endRange).format('DD.M.YYYY')

  // console.log(printStart, printEnd, typeof printStart)


  const loggedUser = getCookie("token");

  (async () => {
    const role = await getRole(loggedUser);
    setUserRole(role);
  })();

  const loggedUserTOCol = [
    { field: "userID", headerName: "User ID", minWidth: 80, flex: 1 },
    { field: "userName", headerName: "Username", minWidth: 100, sortable: false, flex: 1 },
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


  // const calHandler = () => {
  //   setShowCal(!showCal);
  // };

  // const EndHandler = () => {
  //   setShowCalEnd(!showCalEnd);
  // };

  // search Handler
  const onSearchHandler = async (e) => {
    e.preventDefault();
    console.log(loggedUser, "start:", startMom._i, "end", endMom._i, gameType);
    console.log(loggedUser, "start:", startRange, "end", endRange, gameType);
    // console.log(typeof startMom, typeof endMom)
    setLoading("Loading...");
    setShowTable(true)
    try {
      if(selectDate === 'lastweek' || selectDate === 'lastmonth') {
        console.log("custom")
        const res = await axios.post(
          "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/turnover",
          {
            userID: parseInt(loggedUser),
            from: startRange,
            to: endRange,
            gameType: gameType,
          }
        );
        setGameData({id: parseInt(loggedUser), ...res.data?.data});
        setUsersUnder(res.data?.data?.childTurnOverArray.map(user => {
          return{
            id: user.userID,
            comPercent: user.comPercent.toFixed(2),
            netProfit: user.netProfit.toFixed(2),
            ...user,
          }
        }))
      }else{
        console.log("calendar")
        const res = await axios.post(
          "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/turnover",
          {
            userID: parseInt(loggedUser),
            from: startMom._i,
            to: endMom._i,
            gameType: gameType,
          }
        );
        setGameData({id: parseInt(loggedUser), ...res.data?.data});
        setUsersUnder(res.data?.data?.childTurnOverArray.map(user => {
          return{
            id: user.userID,
            comPercent: user.comPercent.toFixed(2),
            netProfit: user.netProfit.toFixed(2),
            ...user,
          }
        }))
      }

      // let fromDateString = new Date(from).toUTCString();
      // console.log("from1", fromDateString);
      // fromDateString = fromDateString.split(' ').slice(0, 6).join(' ');
      // console.log("from", fromDateString);
      
      // let toDateString = new Date(from).toUTCString();
      // console.log("to1", fromDateString);
      // toDateString = toDateString.split(' ').slice(0, 5).join(' ');
      // console.log("to", toDateString);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("");
    }
  };
  // console.log(gameData);
  // console.log(usersUnder)
  // console.log(showTable);

  const viewDetailsCol = [
    {
      field: "details",
      headerName: '',
      width: 130,
      sortable: false,
      renderCell : (params) => {
        if(userRole === "SUPERADMIN"){
          return(
            <Link to={`/admin/distributor/${params.row.userID}/${startMom._i}-to-${endMom._i}/${gameType}`}>
              <Button variant="secondary" size="sm">View Details</Button>
            </Link>
          )
        }
        if(userRole === "ADMIN"){
          return(
            <Link to={`/distributor/stokist/${params.row.userID}/${startMom._i}-to-${endMom._i}/${gameType}`}>
              <Button variant="secondary" size="sm">View Details</Button>
            </Link>
          )
        }
        if(userRole === "Distributor"){
          return(
            <Link to={`/stokist/player/${params.row.userID}/${startMom._i}-to-${endMom._i}/${gameType}`}>
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
  // console.log(gameData?.netProfit?.toFixed(2))
  return (
    <>
      <form className="input-area">
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
          <div>
            <label>Select Date Range &nbsp;
              <span style={{cursor: 'pointer'}}>
              {!showDatePicker ? <BsCalendar3 onClick={datePickerHandler} /> : <IoClose onClick={datePickerHandler} />}
              </span>
            </label>
            {selectDate === '' && <p>{moment(startDate).format('DD.M.YYYY')} - {moment(endDate).add(1, 'days').subtract(1, 'seconds').format('DD.M.YYYY')}</p>}
            {(selectDate === 'lastweek' || selectDate === 'lastmonth') && <p>{printStart} - {printEnd}</p>}

            {showDatePicker && 
            <DateRangePicker 
            ranges={[selectionRange]} 
            onChange={handleSelect}
            weekStartsOn={1}
            />}
          </div>

          <div>
            <select name="selectDate" onChange={handleLastWeek} onClick={() => setShowDatePicker(false)}>
              <option value="" selected={selectDate === ''} disabled>Auto Date Range</option>
              <option value="lastweek">Last 7 Days</option>
              <option value="lastmonth">Last 30 Days</option>
            </select>
          </div>
        </div>

        <button onClick={onSearchHandler}>Search</button>
      </form>

      {showTable && loading !== "" &&
        <p style={{display: 'grid', placeItems: 'center', fontSize: '20px'}}>{loading}</p>
      }

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
          pageSize={25}
          ></DataGrid>
        </DataTable>
      </>
      }
    </>
  );
};

export default Turnover2;
