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

const GameSettings = () => {
  const [gameType, setGameType] = useState("All")
  const [multiplier, setMultiplier] = useState("")
  const [payoutPercent, setpayoutPercent] = useState('')
  const [allPayoutPercents, setAllPayoutPercents] = useState([])

  useEffect(() => {
    const getPayoutPercent = async () => {
      try {
        const res = await axios.get('https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod//users/login/admin/payoutpercent')
        // console.log(res.data)
        setAllPayoutPercents(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getPayoutPercent()
  }, [])


  const handleSubmitMultiplier = async (e) => {
    e.preventDefault()
    
    if ((1 > multiplier) || (multiplier > 20)) {
      alert("select values in range 1-20");
      return;
    }

    setMultiplier(e.target.value)
    // console.log(multiplier);

    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/setmultiplier`,
        {
          gameType: gameType,
          multiplier: multiplier
        }
      );
      // console.log(gameType, multiplier); 
      // console.log("Multiplier", res.data);

      setMultiplier("")
      setGameType("")
      // console.log("Settings:...............", res.data);
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
                    <option value="jeetoJoker">jeetoJoker ⇨ Current payout percentage {allPayoutPercents.jeetoJoker}%</option>
                    <option value="doubleChance">doubleChance ⇨ Current payout percentage {allPayoutPercents.doubleChance}%</option>
                    <option value="singleChance">signleChance ⇨ Current payout percentage {allPayoutPercents.singleChance}%</option>
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

        <br />
      </Container>
      
      <GameSettingOnOff />
      <hr style={{width: '80%', margin: '0 auto'}} />
      <RandomResult />

      <ToastContainer />
    </>
  );
};
export default GameSettings;
