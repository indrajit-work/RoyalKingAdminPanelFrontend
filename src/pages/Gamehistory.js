import React, { useState ,useEffect} from "react";
import ReactModal from 'react-modal';
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
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

ReactModal.setAppElement("#root")

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

const Table = styled.table`
  width: 80%;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
`

const Gamehistory = () => {
  const [pageSize, setPageSize] = useState(25);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const[getAdmin,setAdmins]=useState();

  const date=new Date();
  date.setHours(0,0,0,0)
  const date2=new Date();
  date2.setHours(23,59,59,59)

  const [value, onChanage] = useState(date);
  const [endValue, eonChanage] = useState(date2);
  const [showCal, setShowCal] = useState(false);
  const [showCalEnd,setshowCalEnd]=useState(false);
  const [type,setType]=useState();
  const[btnText,setbtn]=useState({
    btn:"Search"
  });
  const [id, setId] = useState("0");
  const [allGameData, setAllGameData] = useState([])
  const [bets, setBets] = useState([])
  const [result, setResult] = useState('')

  const {btn} =btnText

  // console.log(allGameData)

  const loggedUserTOCol = [
    { field: "ticketID", headerName: "Ticket ID", minWidth: 100, flex: 1 },
    { field: "autoClaim", headerName: "Auto Claim", minWidth: 100, sortable: false, flex: 1 },
    { field: "claimed", headerName: "Claimed", minWidth: 100, flex: 1 },
    { field: "createdTimeReadable", headerName: "Date", minWidth: 200, flex: 1 },
    { field: "gameID", headerName: "Game ID", minWidth: 120, flex: 1 },
    { field: "gameType", headerName: "Game Type", minWidth: 120, flex: 1 },
    { field: "multiplier", headerName: "Multiplier", minWidth: 100, flex: 1 },
    { field: "played", headerName: "Played", minWidth: 100, flex: 1 },
    { field: "ticketStatus", headerName: "Ticket Status", minWidth: 120, flex: 1 },
    { field: "userID", headerName: "User ID", minWidth: 100, flex: 1 },
    { field: "userName", headerName: "Username", minWidth: 120, flex: 1 },
    { field: "win", headerName: "Win", minWidth: 100, flex: 1 },
    {
      field: "bets", headerName: "Bets", minWidth: 100, sortable: false, flex: 1,
      renderCell: (params) => {
        // console.log(params)

        const fetchBetDetails = async() => {
          setIsModalOpen(true)
          try {
            const res = await axios.get(`https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/ticket/betdetails?ticketID=${params?.row?.ticketID}`)

            // console.log(res.data)
            setResult(res.data?.gameResult)
            prizeOnBet(res.data?.bets, res.data?.gameResult, res.data?.multiplier, res.data?.gameType)
          } catch (error) {
            console.log(error.message)
          }
        }
        
        let winAmount = 0;
        let hasWon = false;

        //prizeOnBet function return win for each bet
        const prizeOnBet = (bets, result, multiplier, gameType) => {
          // console.log(bets, result, multiplier, gameType)

          bets?.forEach(bet => {
            winAmount = 0
            if(bet.betOn === result){
              switch (gameType) {
                case "jeetoJoker":
                  winAmount += bet.betValue * 10 * multiplier;
                  break;
                case "cards16":
                  winAmount += bet.betValue * 14 * multiplier;
                  break;
                case "cards52":
                  winAmount += bet.betValue * 45 * multiplier;
                  break;
                case "singleChance":
                  winAmount += bet.betValue * 9 * multiplier;
                  break;
                case "doubleChance":
                  winAmount += bet.betValue * 90 * multiplier;
                  break;
                default:
                  break;
              }
              bet.winAmount = winAmount
              hasWon = true;
            }
            else { // For andar bahar 
              if (gameType === "doubleChance") {
                let betOnArray = bet.betOn.split(".");
                let position = betOnArray[1];
    
                if (position === "Andar" || position === "Bahar") {
    
                  let singleBetOn = betOnArray[0];
  
                  if (result !== null) {
                    let resultArray = result.split(".");
                    if (resultArray.length > 1) {
                      if (position === "Andar") {
                        if (singleBetOn === resultArray[1]) {
                          hasWon = true;
                          winAmount += bet.betValue * 9 * multiplier;
                        }
                      }
                      else if (position === "Bahar") {
                        if (singleBetOn === resultArray[0]) {
                          hasWon = true;
                          winAmount += bet.betValue * 9 * multiplier;
                        }
                      }
                    }
                  }
                }
              }
              bet.winAmount = winAmount
            }
            setBets(bets)
          })
        }

        return(
          <>
            <div>
              <button onClick={fetchBetDetails}>Bet Details</button>
              <ReactModal isOpen={isModalOpen} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsModalOpen(false)}>
                <div className="app__modal">
                  <div className='app__modal-content'>    
                    <h1>Bet Details</h1>
                    <p>Game Result: <span style={{fontWeight: 'bold', color: 'green'}}>{result}</span></p>
                    <Table>
                      <thead>
                        <tr style={{color: 'gray'}}>
                          <th>Bet</th>
                          <th>Played</th>
                          <th>Win</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bets?.map((bet, index) => (
                          <tr key={index}>
                            <td>{bet.betOn}</td>
                            <td>{bet.betValue}</td>
                            <td>{bet.winAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <AiIcons.AiOutlineCloseCircle className='close' onClick={() => setIsModalOpen(false)} />
                </div>
              </ReactModal>
            </div>

          </>
        )
      }
    }
  ];

useEffect(()=>{
  getAdminsData();
},[])
  //admins state

//const{admins}=getAdmin

  const calHandler = () => {
    setShowCal(!showCal);
  };
//console.log("...",value)

const EndHandler=()=>{
  setshowCalEnd(!showCalEnd)
}

const userIdHandler=(e)=>{
    setId(e.target.value);
}

const getAdminsData=async ()=>{
  return  await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getbyrole",{
    userRole:"PLAYER"
}).then((res)=> setAdmins(res.data.adminsAll))
.catch((err)=>console.log(err))
}

//game selecter
const gameTypeHandler=(e)=>{
  //console.log(e.target.value);
  setType(e.target.value);
}

// console.log("value", value)
const getGameData=async ()=>{
  setbtn({
    btn:"Searching"
  })
  let start = value.toString().split(" ").slice(0, 5).join(" ")
  let end = endValue.toString().split(" ").slice(0, 5).join(" ")
  // console.log(start, end, type, id)

  try{
   const res=await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gettickethistory",{
      startTime:start,
      endTime:end,
      gameType:type,
      userID:id
    })
    setAllGameData(res?.data?.tickets?.map(ticket => {
      return{
        ...ticket,
        id: ticket.ticketID
      }
    }))
    setbtn({
      btn:"Search"
    })
    // console.log("gameData", allGameData)
  }catch(err){
    console.log(err);
  }
}

  return (
    <>
    <Container>
      <Card className="mt-4 w-100 shadow-lg">
        <Card.Header>
          <h4 className="text-center">Welcome Administrator</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-muted">Ticket History</Card.Title>
            <br/>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid">
                <Form.Select onChange={gameTypeHandler} className="mb-3" aria-label="Floating label select example">
                  <option>Select from below...</option>
                  <option value="cards16">Cards 16</option>
                  <option value="cards52">Cards 52</option>
                  <option value="jeetoJoker">jeetoJoker</option>
                  <option value="doubleChance">doubleChance</option>
                  <option value="singleChance">signleChance</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
            <span><label className=" text-muted ml-5">Start Date:</label></span>
            <input value={value} disabled className=" ml-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={calHandler} />
              </span>
              {showCal && <Calendar onChange={onChanage} value={value} />}
            </Col>
            <Col md>
            <span><label className="pr-2 text-muted ml-5">End Date:</label></span>
            <input value={endValue} disabled className="mb-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={EndHandler} />
              </span>
              {showCalEnd && <Calendar onChange={eonChanage} value={endValue} />}
            </Col>
            {/* <Col md> */}
            <Form.Group >
                <Form.Label className="text-muted font-weight-bold ">
                  Players
                </Form.Label>
                <Form.Select   className="w-50" onChange={userIdHandler} aria-label="Floating label select example">
                <option>Select below...</option>
                <option value="all">All</option>
                    {!getAdmin? (
                      <option>No data...</option>
                    ) : (
                      
                        getAdmin.map((item, index) => (
                        <option value={item.userID}>
                          {item.fullName}
                          
                          <span >(userID:{item.userID})</span>
                        </option>
                      ))
                    )}
                    
                    
                  </Form.Select>
              </Form.Group>
            {/* </Col> */}
            <Col md>
              
              <Button variant="secondary"  className="ml-3 mt-4" type="submit" onClick={getGameData} >{btn}</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>

    <DataTable>
      <DataGrid
      rows={allGameData}
      columns={loggedUserTOCol}
      checkboxSelection={false}
      rowsPerPageOptions={[25, 50, 100]}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      pageSize={pageSize}
      ></DataGrid>
    </DataTable>
  </>
  );
};

export default Gamehistory;
