import React, { useEffect, useState } from "react";
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
import "react-calendar/dist/Calendar.css";
import "./Icon.css";
import "./Turnover.css";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import GameSettingOnOff from "../components/GameSettingOnOff";
import RandomResult from "../components/RandomResult";
import { getCookie, getRole } from "../utils/auth";

const GameSettings = () => {
  const currHour = new Date().getHours();

  const [gameType, setGameType] = useState("All")
  const [multiplier, setMultiplier] = useState("")
  const [payoutPercent, setpayoutPercent] = useState('')
  const [allPayoutPercents, setAllPayoutPercents] = useState([])
  const [loggedUserRole, setloggedUserRole] = useState('')
  const [supAdminMultiplier, setSupAdminMultiplier] = useState([])
  const [adminMultiplier, setAdminMultiplier] = useState([])

  const [mult_GameType, setMult_GameType] = useState("cards16");
  const [mult_ExpHour, setMult_ExpHour] = useState(currHour + 1);
  const [mult_MultiplierAmt, setMult_MultiplierAmt] = useState("");
  const [mult_HowManyTimes, setMult_HowManyTimes] = useState("");

  // Array of hours from 0 to 23
  const hoursArray = Array.from({ length: 24 }, (_, i) => i);

  // Convert 24-hour time to 12-hour time with AM/PM
  const formatHour = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  // Calculate the duration from the current hour
  const calculateDuration = (hour) => {
    const now = new Date();
    const targetTime = new Date();
  
    targetTime.setHours(hour, 0, 0, 0);
  
    const durationInMs = targetTime - now;
  
    // If the target time is before the current time, add 24 hours to get the correct duration
    if (durationInMs < 0) {
      targetTime.setDate(now.getDate() + 1);
    }
  
    const durationInMsUpdated = targetTime - now;
    const hours = Math.floor(durationInMsUpdated / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMsUpdated % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours > 0 ? `${hours} hr ` : ""}${minutes} min`;
  };  

  useEffect(() => {
    const getPayoutPercent = async () => {
      try {
        const res = await axios.get('https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod//users/login/admin/payoutpercent')
        console.log(res.data)
        setAllPayoutPercents(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getPayoutPercent()
  }, [])

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.post(
          "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getbyrole",
          {
            userRole: "ADMIN"
          });
        setSupAdminMultiplier(res?.data?.adminsAll.map(ele => {
          return {
            adminID: ele.userID,
            multiplier: parseInt(multiplier)
          }
        }))
      } catch (error) {
        console.log(error)
      }
    }

    fetchAdmin()
  }, [multiplier])

  console.log(supAdminMultiplier)
  console.log(multiplier)

  useEffect(() => {
    const getMultiplierAdmin = async () => {
      const res = await axios.get(`https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getmultiplier?gameType=${gameType}`);
      console.log(res.data?.multiplierArray)
    }
    getMultiplierAdmin()
  }, [gameType])

  // get logged user role
  const loggedUser = getCookie("token");
  (async () => {
    const role = await getRole(loggedUser);
    setloggedUserRole(role)
  })();
  console.log(loggedUserRole, loggedUser)
  console.log(typeof loggedUser)
  console.log(typeof multiplier)

  //set multiplier
  const handleSubmitMultiplier = async (e) => {
    e.preventDefault()

    if ((1 > multiplier) || (multiplier > 20)) {
      alert("select values in range 1-20");
      return;
    }

    setMultiplier(e.target.value)
    console.log(multiplier);

    try {
      // switch (loggedUserRole) {
      //   case 'SUPERADMIN':
      //     await axios.post(
      //       `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/setmultiplier`,
      //       {
      //         gameType: gameType,
      //         userID: parseInt(loggedUser),
      //         multiplier: supAdminMultiplier
      //       }
      //     );
      //     break;

      //   case 'ADMIN':
      // const res = await axios.get(`https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getmultiplier?gameType=${gameType}`);
      // console.log(res.data)

      // setAdminMultiplier(res.data?.multiplierArray.map(item => {
      //   console.log(item.adminID)
      //   if (item.adminID === parseInt(loggedUser)) {
      //     return { 
      //       ...item, 
      //       multiplier: parseInt(multiplier) 
      //     };
      //   }
      //   console.log(item)
      //   return item;
      // }))

      // console.log(adminMultiplier)

      await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/setmultiplier`,
        {
          gameType: gameType,
          userID: parseInt(loggedUser),
          multiplier: parseInt(multiplier),
        })

      //   break;

      // default:
      //   break;
      // console.log(gameType, adminMultiplier);

      setMultiplier("")
      setGameType("")

      toast.success('Multiplier has been changed successfully')
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmitPercent = async (e) => {
    e.preventDefault()

    setpayoutPercent(e.target.value)

    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/payoutpercent`,
        {
          gameType: gameType,
          payoutPercent: payoutPercent,
        }
      );
      // console.log(res)
      // console.log(gameType, payoutPercent)

      setpayoutPercent("")
      setGameType("")
      toast.success('Payout percent has been changed successfully')
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAutoMultiplier = async (e) => {
    e.preventDefault();

    if ((1 > mult_MultiplierAmt) || (mult_MultiplierAmt > 20)) {
      alert("Enter Multiplier in range 1-20");
      return;
    }

    if ((1 > mult_HowManyTimes) || (mult_HowManyTimes > 20)) {
      alert("Enter How Many Times in range 1-20");
      return;
    }

    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/automultiplier?userID=${loggedUser}`,
        {
          adminID: loggedUser,
          gameType: mult_GameType,
          hour: mult_ExpHour,
          howManyLeft: mult_HowManyTimes,
          multiplier: mult_MultiplierAmt,
        }
      );
      // console.log(res)
      // console.log(gameType, payoutPercent)

      setMult_ExpHour(currHour + 1);
      setMult_GameType("cards16");
      setMult_HowManyTimes("");
      setMult_MultiplierAmt("");

      toast.success('Auto Multiplier successfully saved')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container>
        <Card className="mt-4 w-100 shadow-lg">
          <Card.Header>
            <h4 className="text-center">Payout Settings</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">Choose Game Type</Card.Title>
            <br />

            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid">
                  <Form.Select
                    onChange={(e) => setGameType(e.target.value)}
                    aria-label="Floating label select example"
                    value={gameType}
                    required
                  >
                    <option value="All">All ⇨ Current payout percentage {allPayoutPercents.all}%</option>
                    <option value="cards16">Cards 16 ⇨ Current payout percentage {allPayoutPercents.card16}%</option>
                    <option value="cards52">Cards 52 ⇨ Current payout percentage {allPayoutPercents.card52}%</option>
                    <option value="jeetoJoker">Jeeto Joker ⇨ Current payout percentage {allPayoutPercents.jeetoJoker}%</option>
                    <option value="doubleChance">Double Chance ⇨ Current payout percentage {allPayoutPercents.doubleChance}%</option>
                    <option value="singleChance">Single Chance ⇨ Current payout percentage {allPayoutPercents.singleChance}%</option>
                    <option value="cards24">Cards 24 ⇨ Current payout percentage {allPayoutPercents.card24}%</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col md></Col>
            </Row>
          </Card.Body>
        </Card>
        <br />

        <Card className="mt-4 w-100 shadow-lg">
          <Card.Header>
            <h4 className="text-center">{gameType}</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">
              Enter Payout Percentage
            </Card.Title>
            <br />

            <Row className="g-2">
              <Col md>
                <FloatingLabel label="Enter Payout Percentage">
                  <Form.Control
                    onChange={(e) => setpayoutPercent(e.target.value)}
                    type="number"
                    placeholder="Enter values from -100 to 100"
                    value={payoutPercent}
                    required={true}
                  />
                </FloatingLabel>
              </Col>
              <Col md> </Col>
            </Row>
            <Button
              variant="secondary"
              className="float-right mr-4"
              onClick={handleSubmitPercent}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>

        <Card className="mt-4 w-100 shadow-lg">
          <Card.Header>
            <h4 className="text-center">{gameType}</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">Enter Multiplier</Card.Title>
            <br />

            <Row className="g-2">
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Select values from 1-20"
                >
                  <Form.Control
                    onChange={((e) => setMultiplier(e.target.value))}
                    type="number"
                    min={1} max={20}
                    placeholder="Enter values from -100 to 100"
                    value={multiplier}
                    required={true}
                  />
                </FloatingLabel>
              </Col>

              <Col md>
                <Button
                  className="float-right mr-4"
                  onClick={handleSubmitMultiplier}
                  variant="secondary"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mt-4 w-100 shadow-lg">
          <Card.Header>
            <h4 className="text-center">Auto Multiplier Settings</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">Configure Settings Below</Card.Title>
            <br />

            <Row className="g-2">
              {/* Game Type Dropdown */}
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Select Game Type">
                  <Form.Select
                    onChange={(e) => setMult_GameType(e.target.value)}
                    aria-label="Floating label select example"
                    value={mult_GameType}
                    required
                  >                    
                    <option value="cards16">Cards 16</option>
                    <option value="cards52">Cards 52</option>
                    <option value="jeetoJoker">Jeeto Joker</option>
                    <option value="doubleChance">Double Chance</option>
                    <option value="singleChance">Single Chance</option>
                    <option value="cards24">Cards 24</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              {/* Hour Dropdown */}
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Select Duration">
                  <Form.Select
                    onChange={(e) => setMult_ExpHour(e.target.value)}
                    aria-label="Floating label select example"
                    value={mult_ExpHour}
                  >
                    {hoursArray.map((hour) => (
                      <option key={hour} value={hour}>
                        Till {formatHour(hour)} | For {calculateDuration(hour)}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>

              {/* Multiplier Amount */}
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Enter Multiplier (1-20)"
                >
                  <Form.Control
                    onChange={((e) => setMult_MultiplierAmt(e.target.value))}
                    type="number"
                    min={1} max={20}
                    placeholder="Enter values from 1 to 20"
                    value={mult_MultiplierAmt}
                    required={true}
                  />
                </FloatingLabel>
              </Col>

              {/* How Many Dropdown */}              
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Enter How Many Times (1-20)"
                >
                  <Form.Control
                    onChange={((e) => setMult_HowManyTimes(e.target.value))}
                    type="number"
                    min={1} max={20}
                    placeholder="Enter values from 1 to 20"
                    value={mult_HowManyTimes}
                    required={true}
                  />
                </FloatingLabel>
              </Col>                 
            </Row>

            <Row className="g-2">
              <Col md>
                <Button
                  className="float-right mr-4 mt-4"
                  onClick={handleSubmitAutoMultiplier}
                  variant="secondary"
                >
                  Submit
                </Button>
              </Col>              
            </Row>
          </Card.Body>
        </Card>

        <br />
      </Container>

      {loggedUserRole === 'SUPERADMIN' &&
        <>
          <GameSettingOnOff />
          <hr style={{ width: '80%', margin: '0 auto' }} />
        </>
      }

      <RandomResult />

      <ToastContainer />
    </>
  );
};
export default GameSettings;


// [
//   {
//    "adminID": 58,
//    "multiplier": 4
//   },
//   {
//    "adminID": 27,
//    "multiplier": 4
//   },
//   {
//    "adminID": 26,
//    "multiplier": 4
//   },
//   {
//    "adminID": 41,
//    "multiplier": 4
//   }
//  ]