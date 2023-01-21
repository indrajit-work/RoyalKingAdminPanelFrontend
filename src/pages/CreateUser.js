import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Container, Alert } from "react-bootstrap";
import "./RegDis.css";
import axios from "axios";
import { getCookie, getRole } from "../utils/auth";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as AiIcons from "react-icons/ai";
import "./Icon.css";
import { TiTick, TiTimes } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const CreateUser = () => {
  const [value, onChanage] = useState(new Date());
  const [bossInfo, setBossInfo] = useState();
  const [usernameIsvalid, setUsernameIsvalid] = useState(null);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    verifyPassword: "",
    userRole: "",
    commPercent: 0,
    bossId: 0,
    fullName: "",
    phNo: 0,
    buttonText: "Submit",
  });
  const [userNameList, setUserNameList] = useState([]);
  const [loggedUserRole, setloggedUserRole] = useState('')
  const roleList = ['Admin', 'Distributor', 'Stokist', 'Player']

  const {
    userName,
    password,
    verifyPassword,
    userRole,
    commPercent,
    bossID,
    fullName,
    phNo,
    buttonText,
  } = user;

  const loggedUser = getCookie("token");
  // console.log("logeed in", loggedUser);

  (async () => {
    const role = await getRole(loggedUser);
    setloggedUserRole(role)
  })();

  // console.log(loggedUserRole);

  // console.log(userRole)

  useEffect(() => {
    getBossInfo();
  }, []);

  const getBossInfo = async () => {
    const res = await axios.post(
      "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getbyrole",
      {
        userRole: userRole,
      }
    );
    setBossInfo(res.data.adminsAll);
  };
  // console.log(bossInfo)

  // fetch all the users data from DB and store the username in state
  const fetchuserList = async () => {
    // let userArr = []
    await fetch(
      "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getallusers"
    )
      .then((res) => res.json())
      .then((data) => {
        data.users.map(user =>
        // console.log([user?.userName])
          setUserNameList((prev) => [...prev, user?.userName])
        );
      });
  };

  useEffect(() => {
    fetchuserList();
  }, []);
//   console.log(userNameList)

  const usernameCheckHandler = (input) => {
    setUsernameIsvalid(true);

    if (userNameList.includes(input)) {
      setUsernameIsvalid(false);
      // console.log("wrong");
    }
    setUser({ ...user, userName: input });
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      alert("Passwords don't match(password and verify Password)");
      return;
    }
    setUser({ ...user, buttonText: "Submitting...." });
    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/createuser`,
        {
          userName,
          password,
          userRole,
          commPercent,
          bossID,
          fullName,
          phone: phNo,
          dateOfbirth: value,
        }
      );

      // console.log("Submited:...............", res);
      setUser({
        ...user,
        userName: "",
        email: "",
        password: "",
        verifyPassword: "",
        commPercent: "",
        bossID: "",
        fullName: "",
        phNo: 0,
        buttonText: "Submited",
      });
      toast.success("User added successfully")
    } catch (error) {
      console.log(error);
      setUser({
        ...user,
        buttonText: "Submit",
      });
    }
  };

  const [showCal, setShowCal] = useState(false);

  //showing cal on clicking icon
  const calHandler = () => {
    setShowCal(!showCal);
  };

  // console.log(value)

  return (
    <Container>
      <Row>
        <Card
          border="secondary"
          style={{ width: "68rem" }}
          className="m-auto mt-5  shadow-lg"
        >
          <Card.Header className="text-muted font-weight-bold">
            Register New User
          </Card.Header>
          <Card.Body>
            <h4 className="text-muted text-center">Login Info</h4>
            <Form onSubmit={onHandleSubmit}>
              {/* username */}
              <Form.Group
                controlId="formBasicPassword"
                className="pb-2"
                style={{ position: "relative" }}
              >
                <Form.Label className="text-muted font-weight-bold">
                  userName
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => usernameCheckHandler(e.target.value)}
                  autocomplete="off"
                  required
                  name='userName'
                  value={userName}
                />
                {!usernameIsvalid && userName.length !== 0 && (
                  <>
                    <TiTimes
                      style={{
                        color: "red",
                        position: "absolute",
                        right: "1%",
                        top: "37.5%",
                      }}
                    />
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{userName}</span> is
                      already taken
                    </p>
                  </>
                )}
                {usernameIsvalid && userName.length > 0 && (
                  <>
                    <TiTick
                      style={{
                        color: "green",
                        position: "absolute",
                        right: "1%",
                        top: "37.5%",
                      }}
                    />
                    <p
                      style={{
                        color: "green",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{userName}</span> is
                      available
                    </p>
                  </>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="pb-2">
                <Form.Label className="text-muted font-weight-bold">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleChange("password")}
                  name='password'
                  value={password}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-muted font-weight-bold">
                  Verify Password
                </Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleChange("verifyPassword")}
                  name='verifyPassword'
                  value={verifyPassword}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-2">
                  Role
                </Form.Label>
                <Form.Control as="select" name='userRole'>
                  <option value="" disabled selected>Select below...</option>
                  {loggedUserRole === 'SUPERADMIN' && roleList.map((role, i) => (
                    <option key={i} value={role}>{role}</option>
                  ))}
                  {loggedUserRole === 'ADMIN' && roleList.slice(1).map((role, i) => (
                    <option key={i} value={role}>{role}</option>
                  ))}
                  {loggedUserRole === 'Distributor' && roleList.slice(2).map((role, i) => (
                    <option key={i} value={role}>{role}</option>
                  ))}
                  {loggedUserRole === 'STOKIST' && roleList.slice(3).map((role, i) => (
                    <option key={i} value={role}>{role}</option>
                  ))}
                  {loggedUserRole === 'PLAYER' && roleList.slice(4).map((role, i) => (
                    <option key={i} value={role}>{role}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Commision percentage(%)
                </Form.Label>
                <Form.Control
                  type="number"
                  onChange={handleChange("commPercent")}
                  name='commPercent'
                  value={commPercent}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Boss Id
                </Form.Label>
                <Form.Select
                  onChange={handleChange("bossID")}
                  name='bossID'
                  aria-label="Floating label select example"
                >
                  <option value="" disabled selected>Select below...</option>
                  {!bossInfo ? (
                    <option>No data...</option>
                  ) : (
                    bossInfo.map((item, index) => (
                      <option key={index} value={item.userID}>
                        {item.fullName} (UserID:{item.userID})
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>
              <br />
              <br />
              <hr style={{ color: "black" }} />
              <h4 className="text-muted text-center">Personal Info</h4>
              <hr style={{ color: "black" }} />
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange("fullName")}
                  name='fullName'
                  value={fullName}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold pt-3">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="number"
                  onChange={handleChange("phNo")}
                  name='phNo'
                  value={phNo}
                  required
                />
              </Form.Group>
              <Form.Label className="text-muted font-weight-bold pt-3 pb-3">
                Date Of Birth
              </Form.Label>
              <br />
              <input value={value} disabled className="mb-3" />
              <span className="iconStyle">
                <AiIcons.AiFillSchedule onClick={calHandler} />{" "}
              </span>
              {showCal && <Calendar onChange={onChanage} value={value} />}

              <button className="float-right mt-4 btn btnChange" type="submit" disabled={!usernameIsvalid}>
                {buttonText}
              </button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default CreateUser;
