import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie, getRole } from '../utils/auth'
import { TiTick, TiTimes } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [commPercent, setCommPercent] = useState('')
    const [userRole, setUserRole] = useState('')
    const [bossID, setBossID] = useState('')
    const [phNo, setphNo] = useState('')
    const [dateOfbirth, setDateOfbirth] = useState('')
    const [resetDevice, setResetDevice] = useState('')
    const [verified, setVerified] = useState(false)
    const [block, setBlock] = useState("")
    const [loggedUserRole, setloggedUserRole] = useState('')

    const [userList, setUserList] = useState([])
    const [userNameList, setUserNameList] = useState([]);
    const [usernameIsvalid, setUsernameIsvalid] = useState(null);

    const [userInfo, setUserInfo] = useState({})

    const roleList = ['ADMIN', 'Distributor', 'STOKIST', 'PLAYER']

    const params = useParams();
    const userID = params.userID;
    const deviceID = params.deviceID ?? "";
    // console.log(userID, deviceID);

    // get loggedin user id
    const loggedUser = getCookie("token");

    // get logged user role
    (async () => {
        const role = await getRole(loggedUser);
        setloggedUserRole(role)
    })();

  // get boss info
  useEffect(() => {
      getAllUsers();
  }, []);
  
  const getAllUsers = async () => {
    const res = await axios.get(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getallusers",
    );
    setUserList(
        res.data?.users.map((user) => {
          return {
            ...user,
            id: user.userID,
          };
        })
      );
      res.data?.users.map(user =>{
            return (
                setUserNameList((prev) => [...prev, user?.userName])
            )
        });
    }

    const adminLists = userList.filter(user => user.userRole === 'ADMIN')
    const superadminLists = userList.filter(user => user.userRole === 'SUPERADMIN')
    const distributorLists = userList.filter(user => user.userRole === 'Distributor')
    const stokistLists = userList.filter(user => user.userRole === 'STOKIST')

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/fetchuserbyid?userID=${userID}`
        );
        // console.log(res.data.data)
        setUserInfo(res.data.data)

        setUserName(res.data.data.userName)
        setFullName(res.data.data.fullName)
        setPassword(res.data.data.password)
        setBossID(res.data.data.bossID)
        setUserRole(res.data.data.userRole)
        setDateOfbirth(res.data.data.dateOfbirth)
        setBlock(res.data.data.blocked)
        setphNo(res.data.data.phone)
        setVerified(res.data.data.verified)
        setCommPercent(res.data.data.commPercent)
        setResetDevice(res.data.data.deviceID)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchUser()
    }, [])

    //username check
    const usernameCheckHandler = (input) => {
        setUsernameIsvalid(true);

        if(userInfo.userName === input){
          setUsernameIsvalid(true);
        }

        if (userNameList.includes(input)) {
            setUsernameIsvalid(false);
            console.log("wrong");
        }
        setUserName(input);
    };

    //reset device handler
    const handleDeviceReset = () => {
      setResetDevice("")
      console.log(resetDevice)
    };

    //handle block ....................................
    const blockHandler = async () => {
      try {
        const res = await axios.post(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/blockuser`,
          {
            userID: userID,
            block: "yes",
          }
        );
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      // setBlock("yes");
    }


    // form submit logic
    const onHandleSubmit = async (e) => {
        e.preventDefault();
        // setUserName(userName)

        console.log(
                "userName", userName,
                "fullName", fullName,
                "password",password,
                "role", userRole,
                "per", commPercent,
                "boss", bossID,
                "ph", phNo,
                "dob", dateOfbirth,
                "block", block,
                userID,
                verified,
                "device", resetDevice
                )

        try {
            const res = await axios.post(
              `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/modifyuser`,
              {
                userID,
                userName,
                password,
                userRole,
                commPercent,
                bossID,
                fullName,
                phone: phNo,
                dateOfbirth,
                verified,
                blocked: block,
                deviceID: resetDevice
              }
            );
            toast.success("User edited successfully")
        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong")
          }
        };

  return (
    <div className='form-container'>
        <h2>Edit User Info</h2>
        <form className='form' onSubmit={onHandleSubmit} >
            <div className='input-control'>
              <label className='input-label'>UserName</label>
              <input type="text" name='userName' defaultValue={userInfo.userName} onChange={(e) => usernameCheckHandler(e.target.value)}
                autocomplete="off" required />
              {!usernameIsvalid && userName.length !== 0 && userInfo.userName !== userName && (
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
                   <span style={{ fontWeight: "bold" }}>{userName}</span> is current username
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
            <div className='input-control'>
                <label className='input-label'>Full Name</label>
                <input type="text" name='fullName' defaultValue={userInfo.fullName} onChange={(e) => setFullName(e.target.value)} autocomplete="off" required />
            </div>
            <div className='input-control'>
                <label className='input-label'>Password</label>
                <input type="password" name='password' defaultValue={userInfo.password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='input-control'>
                <label className='input-label'>User Role</label>
                <select name="userRole" onChange={(e) => setUserRole(e.target.value)}>

                  <option value="" disabled selected>{userInfo.userRole}</option>
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
                </select>
            </div>
            <div className='input-control'>
                <label className='input-label'>Boss ID</label>
                <select name="bossID" onChange={(e) => setBossID(e.target.value)}>
                    <option value="" disabled selected>{userInfo.bossID}</option>
                    {userRole === 'ADMIN' && superadminLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                    {userRole === 'Distributor' && adminLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                    {userRole === 'STOKIST' && distributorLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                    {userRole === 'PLAYER' && stokistLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                </select>
            </div>
            <div className='input-control'>
                <label className='input-label'>Commision Percentage(%)</label>
                <input type="text" name='commPercent' defaultValue={userInfo.commPercent} onChange={(e) => setCommPercent(e.target.value)} required />
            </div>
            <div className='input-control'>
                <label className='input-label'>Mobile Number</label>
                <input type="number" name='phNo' defaultValue={userInfo.phone} onChange={(e) => setphNo(e.target.value)} />
            </div>
            <div className='input-control'>
                <label className='input-label'>Date of Birth</label>
                <input type="date" name='dateOfbirth' defaultValue={userInfo.dateOfbirth} onChange={(e) => setDateOfbirth(e.target.value)} />
            </div>
            <div className='input-control single-input'>
                <input type="text" name='block' value={userInfo.block} onChange={(e) => setBlock(e.target.value)} />
                <button className='button' onClick={blockHandler}>{block === 'yes' ? "UnBlock" : "Block"}</button>
            </div>
            <div className='input-control single-input'>
                <input type="text" name='verified' defaultValue={userInfo.verified} onChange={(e) => setVerified(e.target.value)} />
                <button className='button'>{verified ? "Verified" : "Verify"}</button>
            </div>
            <div className='input-control single-input'>
                <input type="text" name='resetDevice' value={userInfo.deviceID} />
                <button className={`button ${resetDevice.length === 0 ? 'reset' : ''}`} onClick={handleDeviceReset}>Reset</button>
            </div>

            <button className='button'>Edit</button>
        </form>
        <ToastContainer />
    </div>
  )
}

export default EditUser