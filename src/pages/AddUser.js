import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie, getRole } from '../utils/auth'
import { TiTick, TiTimes } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const AddUser = () => {
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [commPercent, setCommPercent] = useState('')
    const [userRole, setUserRole] = useState('')
    const [bossID, setBossID] = useState('')
    const [phNo, setphNo] = useState('')
    const [dateOfbirth, setDateOfbirth] = useState(null)
    const [loggedUserRole, setloggedUserRole] = useState('')

    const [userList, setUserList] = useState([])
    const [userNameList, setUserNameList] = useState([]);
    const [usernameIsvalid, setUsernameIsvalid] = useState(null);

    const roleList = ['Admin', 'Distributor', 'Stokist', 'Player']

    console.log(userRole, userName, password, fullName, commPercent, bossID, phNo)

    // get loggedin user id
    const loggedUser = getCookie("token");
    console.log("logeed in", loggedUser);

    // get logged user role
    (async () => {
        const role = await getRole(loggedUser);
        setloggedUserRole(role)
    })();
  console.log(loggedUserRole);

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
        // console.log([user?.userName])
            return (
                setUserNameList((prev) => [...prev, user?.userName])
            )
        });
    }

    const adminLists = userList.filter(user => user.userRole === 'ADMIN')
    const superadminLists = userList.filter(user => user.userRole === 'SUPERADMIN')
    const distributorLists = userList.filter(user => user.userRole === 'Distributor')
    const stokistLists = userList.filter(user => user.userRole === 'STOKIST')
    // const playerLists = userList.filter(user => user.userRole === 'PLAYER')
    // console.log(adminLists, distributorLists, stokistLists, playerLists)

    //username check
    const usernameCheckHandler = (input) => {
        setUsernameIsvalid(true);

        if (userNameList.includes(input)) {
            setUsernameIsvalid(false);
            console.log("wrong");
        }
        setUserName(input);
    };

    // form submit logic
    const onHandleSubmit = async (e) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            alert("Passwords don't match(password and verify Password)");
            return;
        }

        if(!usernameIsvalid){
            return
        }

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
                dateOfbirth
              }
            );
            console.log("Submited:...............", res);
            reset()
            toast.success("User added successfully")
        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong")
          }
        };

    const reset = () => {
        setUserName("");
        setPassword("");
        setFullName("");
        setVerifyPassword("");
        // setUserRole(),
        setBossID();
        setCommPercent("");
        setBossID("");
        setphNo("");
        setDateOfbirth(null)
    }

  return (
    <>
        <h4>Login Info</h4>
        <form onSubmit={onHandleSubmit}>
            <div>
                <label>UserName</label>
                <input type="text" name='userName' value={userName} onChange={(e) => usernameCheckHandler(e.target.value)}
                  autocomplete="off" required />
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
            </div>
            <div>
                <label>Full Name</label>
                <input type="text" name='fullName' value={fullName} autocomplete="off" onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Verify Password</label>
                <input type="password" name='verifyPassword' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
            </div>
            <div>
                <label>User Role</label>
                <select name="userRole" onChange={(e) => setUserRole(e.target.value)}>

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
                </select>
            </div>
            <div>
                <label>Boss</label>
                <select name="bossID" onChange={(e) => setBossID(e.target.value)}>
                    <option value="" disabled selected>Select below...</option>
                    {userRole === 'Admin' && superadminLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                    {userRole === 'Distributor' && adminLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                    {userRole === 'Stokist' && distributorLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                    {userRole === 'Player' && stokistLists.map((role, i) => (
                        <option key={i} value={role.userID}>{role.fullName}({role.userID})</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Commision Percentage(%)</label>
                <input type="text" name='commPercent' value={commPercent} autocomplete="off" onChange={(e) => setCommPercent(e.target.value)} required />
            </div>
            <div>
                <label>Mobile Number</label>
                <input type="number" name='phNo' value={phNo} autocomplete="off" maxLength={10} onChange={(e) => setphNo(e.target.value)} />
            </div>
            <div>
                <label>Date of Birth</label>
                <input type="date" name='dateOfbirth' value={dateOfbirth} onChange={(e) => setDateOfbirth(e.target.value)} />
            </div>

            <button>Submit</button>
        </form>
        <ToastContainer />
    </>
  )
}

export default AddUser