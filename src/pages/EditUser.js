import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie, getRole } from "../utils/auth";
import { TiTick, TiTimes } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditUser = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [commPercent, setCommPercent] = useState("");
  const [userRole, setUserRole] = useState("");
  const [bossID, setBossID] = useState("");
  const [phNo, setphNo] = useState("");
  const [dateOfbirth, setDateOfbirth] = useState("");
  const [verified, setVerified] = useState("");
  const [block, setBlock] = useState("");
  const [payout, setPayout] = useState();
  const [changeUsername, setChangeUsername] = useState();
  const [loggedUserRole, setloggedUserRole] = useState("");

  const [userList, setUserList] = useState([]);
  const [userNameList, setUserNameList] = useState([]);
  const [usernameIsvalid, setUsernameIsvalid] = useState(null);
  const [changeRole, setChangeRole] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const [userInfo, setUserInfo] = useState({});
  const [loggedUserInfo, setLoggedUserInfo] = useState({});

  const [resetDevice, setResetDevice] = useState("");
  const roleList = ["ADMIN", "Distributor", "STOKIST", "PLAYER"];

  const params = useParams();
  const userID = params.userID;
  const deviceID = params.deviceID ?? "";
  // console.log(userID, deviceID);
  const history = useHistory()

  // get loggedin user id
  const loggedUser = getCookie("token");

  // get logged user role
  (async () => {
    const role = await getRole(loggedUser);
    setloggedUserRole(role);
  })();

  const fetchLoggedUserInfo = async () => {
    try {
      const res = await axios.get(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/fetchuserbyid?userID=${loggedUser}`
      );
      setLoggedUserInfo(res.data.data.changeUsername);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(loggedUserInfo);

  useEffect(() => {
    fetchLoggedUserInfo();
  }, []);

  // get boss info
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await axios.get(
      "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getallusers"
    );
    setUserList(
      res.data?.users.map((user) => {
        return {
          ...user,
          id: user.userID,
        };
      })
    );
    res.data?.users.map((user) => {
      return setUserNameList((prev) => [...prev, user?.userName]);
    });
  };

  const adminLists = userList.filter((user) => user.userRole === "ADMIN");
  const superadminLists = userList.filter(
    (user) => user.userRole === "SUPERADMIN"
  );
  const distributorLists = userList.filter(
    (user) => user.userRole === "Distributor"
  );
  const stokistLists = userList.filter((user) => user.userRole === "STOKIST");

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/fetchuserbyid?userID=${userID}`
      );
      // console.log(res.data.data);
      setUserInfo(res.data.data);

      setUserName(res.data.data.userName);
      setFullName(res.data.data.fullName);
      setPassword(res.data.data.password);
      setBossID(res.data.data.bossID);
      setUserRole(res.data.data.userRole);
      setDateOfbirth(res.data.data.dateOfbirth);
      setBlock(res.data.data.blocked);
      setphNo(res.data.data.phone);
      setVerified(res.data.data.verified);
      setCommPercent(res.data.data.commPercent);
      setPayout(parseInt(res.data.data.payout));
      setResetDevice(res.data.data.deviceID);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //username check
  const usernameCheckHandler = (input) => {
    setUsernameIsvalid(true);

    if (userInfo.userName === input) {
      setUsernameIsvalid(true);
    }

    if (userNameList.includes(input)) {
      setUsernameIsvalid(false);
      // console.log("wrong");
    }
    setUserName(input);
  };

  //reset device handler
  const handleDeviceReset = () => {
    // console.log("clicked");
    setResetDevice("");
    // console.log(resetDevice);
  };

  // form submit logic
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    // console.log(resetDevice)
    console.log(
      "fullName",
      fullName,
      "userName",
      userName,
      "password",
      password,
      "role",
      userRole,
      "per",
      commPercent,
      "boss",
      bossID,
      "ph",
      phNo,
      "dob",
      dateOfbirth,
      "block",
      block,
      userID,
      JSON.parse(verified),
      "device",
      resetDevice === undefined ? "" : resetDevice,
      "payout",
      payout,
      "chngeUsername", changeUsername
    );

    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/modifyuser`,
        {
          userID,
          userName,
          password,
          userRole,
          commPercent,
          payout,
          bossID,
          fullName,
          phone: phNo,
          dateOfbirth,
          verified: JSON.parse(verified),
          blocked: block,
          deviceID: resetDevice === undefined ? "" : resetDevice,
          changeUsername: changeUsername
        }
      );
      // console.log("res", res.data);
      toast.success("User edited successfully");
      setTimeout(() => {
        history.push('/userManager')
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong");
    }
  };

  let disable;
  if(loggedUserRole === 'STOKIST'){
    disable = true
  }
  if(loggedUserRole === 'Distributor'){
    if(loggedUserInfo){
      disable = false
    }else{
      disable = true
    }
  }

  return (
    <div className="form-container">
      <h2>Edit User Info</h2>
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="input-control">
          <label className="input-label">UserName</label>
          <input
            type="text"
            name="userName"
            defaultValue={userInfo.userName}
            onChange={(e) => usernameCheckHandler(e.target.value)}
            autoComplete="off"
            disabled={disable || loggedUserRole === 'STOKIST'}
          />
          {!usernameIsvalid &&
            userName.length !== 0 &&
            userInfo.userName !== userName && (
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
            )}
          {userName === userInfo.userName && (
            <p
              style={{
                color: "green",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{userName}</span> is current
              username
            </p>
          )}
          {usernameIsvalid && userName.length > 0 && (
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
          )}
        </div>
        <div className="input-control">
          <label className="input-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            defaultValue={userInfo.fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="off"
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            required
          />
        </div>
        <div className="input-control">
          <label className="input-label">Password&nbsp;
            <span style={{cursor: 'pointer'}} onClick={prev => setShowPwd(!showPwd)}>
              {!showPwd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </label>
          <input
            type={showPwd ? `text` : `password`}
            name="password"
            defaultValue={userInfo.password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-control">
          <label className="input-label">User Role</label>
          <select name="userRole" defaultValue={userInfo.userRole} disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'} onChange={(e) => {
            setUserRole(e.target.value)
            alert("Please select the proper BossID manually from the list")
            setChangeRole(true)
          }}>
            <option value={userRole} disabled selected>
              {userInfo.userRole}
            </option>
            {loggedUserRole === "SUPERADMIN" &&
              roleList.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            {loggedUserRole === "ADMIN" &&
              roleList.slice(1).map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            {loggedUserRole === "Distributor" &&
              roleList.slice(2).map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            {loggedUserRole === "STOKIST" &&
              roleList.slice(3).map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            {loggedUserRole === "PLAYER" &&
              roleList.slice(4).map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
          </select>
        </div>
        <div className="input-control">
          <label className="input-label">Boss ID
            {changeRole && <span style={{color: 'red', fontSize: '12px'}}> (Select BossID manually from the list)</span>}
          </label>
          <select name="bossID" 
          disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'} 
          onChange={(e) => {setBossID(e.target.value) 
          setChangeRole(false)}} 
          required>
            {!changeRole ? 
              <option value={bossID} disabled selected>
                {userInfo.bossID}
              </option> :
              <option value="" selected>Select Below</option>
            }
            {userRole === "ADMIN" &&
              superadminLists.map((role, i) => (
                <option key={i} value={role.userID}>
                  {role.fullName}({role.userID})
                </option>
              ))}
            {userRole === "Distributor" &&
              adminLists.map((role, i) => (
                <option key={i} value={role.userID}>
                  {role.fullName}({role.userID})
                </option>
              ))}
            {userRole === "STOKIST" &&
              distributorLists.map((role, i) => (
                <option key={i} value={role.userID}>
                  {role.fullName}({role.userID})
                </option>
              ))}
            {userRole === "PLAYER" &&
              stokistLists.map((role, i) => (
                <option key={i} value={role.userID}>
                  {role.fullName}({role.userID})
                </option>
              ))}
          </select>
        </div>

        {(loggedUserRole === "SUPERADMIN" || loggedUserRole === "ADMIN") &&
          userRole === "Distributor" && (
            <div className="input-control">
              <label className="input-label">Change UserName</label>
              <select
                name="changeUsername"
                defaultValue={changeUsername}
                disabled={loggedUserRole === 'STOKIST'}
                onChange={(e) => setChangeUsername(e.target.value)}
              >
                <option value={changeUsername} disabled selected>
                  {userInfo.changeUsername}
                </option>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          )}
        <div className="input-control">
          <label className="input-label">Commision Percentage(%)</label>
          <input
            type="text"
            name="commPercent"
            defaultValue={userInfo.commPercent}
            onChange={(e) => setCommPercent(e.target.value)}
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            required
          />
        </div>
        <div className="input-control">
          <label className="input-label">Payout Percentage</label>
          <input
            type="number"
            name="payout"
            min={0}
            max={100}
            defaultValue={userInfo.payout}
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            onChange={(e) => setPayout(e.target.value)}
            required
          />
        </div>
        <div className="input-control">
          <label className="input-label">Mobile Number</label>
          <input
            type="number"
            name="phNo"
            defaultValue={userInfo.phone}
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            onChange={(e) => setphNo(e.target.value)}
          />
        </div>
        <div className="input-control">
          <label className="input-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfbirth"
            defaultValue={userInfo.dateOfbirth}
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            onChange={(e) => setDateOfbirth(e.target.value)}
          />
        </div>
        <div className="input-control">
          <label className="input-label">Block User</label>
          <select
            name="block"
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            defaultValue={userInfo.block}
            onChange={(e) => setBlock(e.target.value)}
          >
            <option value={block} disabled selected>
              {userInfo.blocked}
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="input-control">
          <label className="input-label">Verify User</label>
          <select
            name="verified"
            defaultValue={userInfo.verified}
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            onChange={(e) => setVerified(e.target.value)}
          >
            <option value={verified} disabled selected>
              {userInfo.verified ? "Yes" : "No"}
            </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <label className="input-label">Device ID</label>
        <div className="input-control single-input reset-input">
          <input
            type="text"
            name="resetDevice"
            disabled={loggedUserRole === 'Distributor' || loggedUserRole === 'STOKIST'}
            defaultValue={resetDevice}
            readOnly
          />
          <input
            type="button"
            style={{ flex: 1 }}
            className={`button ${
              resetDevice === "" || undefined ? "reset" : ""
            }`}
            onClick={handleDeviceReset}
            value="Reset"
            disabled={(resetDevice === "" || undefined) && (loggedUserRole === 'Distributor') && (loggedUserRole === 'STOKIST')}
          />
        </div>
        {/* <div className='input-control single-input'>
                <input type="text" name='block' value={userInfo.block} onChange={(e) => setBlock(e.target.value)} />
                <button className='button' onClick={blockHandler}>{block === 'yes' ? "UnBlock" : "Block"}</button>
            </div> */}
        {/* <div className='input-control single-input'>
                <input type="text" name='verified' defaultValue={userInfo.verified} onChange={(e) => setVerified(e.target.value)} />
                <button className='button'>{verified ? "Verified" : "Verify"}</button>
            </div> */}

        <button className="button" disabled={(loggedUserRole === 'Distributor') || (loggedUserRole === 'STOKIST')}>Edit</button>
      </form>
      <ToastContainer
        style={{ position: "fixed", top: "5%", left: "0" }}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default EditUser;
