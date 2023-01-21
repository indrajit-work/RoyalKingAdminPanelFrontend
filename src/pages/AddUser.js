import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie, getRole } from '../utils/auth'
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
    const [payout, setPayout] = useState()
    const [loggedUserRole, setloggedUserRole] = useState('')

    const [userList, setUserList] = useState([])
    const [userNameList, setUserNameList] = useState([]);
    const [usernameIsvalid, setUsernameIsvalid] = useState(null);

    const roleList = ['ADMIN', 'Distributor', 'STOKIST', 'PLAYER']

    // console.log(userRole, userName, password, fullName, commPercent, bossID, phNo)

    // get loggedin user id
    const loggedUser = getCookie("token");
    // console.log("logeed in", loggedUser);

    // get logged user role
    (async () => {
        const role = await getRole(loggedUser);
        setloggedUserRole(role)
    })();
  // console.log(loggedUserRole);

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
                dateOfbirth,
                payout
              }
            );
            // console.log("Submited:...............", res);
            // console.log(payout)
            reset()
            toast.success("User added successfully")
        } catch (error) {
            // console.log("Error:", error);
            toast.error("Something went wrong")
          }
        };

    const reset = () => {
        setUserName("");
        setPassword("");
        setFullName("");
        setVerifyPassword("");
        setBossID(null);
        setCommPercent("");
        setUserRole(null);
        setBossID("");
        setphNo("");
        setDateOfbirth('dd-mm-yyyy')
        setPayout(null)
    }

  return (
    <div className='form-container'>
        <h2>Add New User</h2>
        <form className='form' onSubmit={onHandleSubmit}>
            <div className='input-control'>
                <label className='input-label'>UserName</label>
                <input type="text" name='userName' value={userName} onChange={(e) => usernameCheckHandler(e.target.value)}
                  autocomplete="off" required />
                {!usernameIsvalid && userName.length !== 0 && (
                  <>
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
            <div className='input-control'>
                <label className='input-label'>Full Name</label>
                <input type="text" name='fullName' value={fullName} autocomplete="off" onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className='input-control'>
                <label className='input-label'>Password</label>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='input-control'>
                <label className='input-label'>Verify Password</label>
                <input type="password" name='verifyPassword' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
            </div>
            <div className='input-control'>
                <label className='input-label'>User Role</label>
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
                </select>
            </div>
            <div className='input-control'>
                <label className='input-label'>Boss ID</label>
                <select name="bossID" onChange={(e) => setBossID(e.target.value)}>
                    <option value="" disabled selected>Select below...</option>
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
                <input type="text" name='commPercent' value={commPercent} autocomplete="off" onChange={(e) => setCommPercent(e.target.value)} required />
            </div>
            <div className='input-control'>
              <label className='input-label'>Payout Percentage</label>
              <input type="number" name='payout' min={0} max={200} value={payout} onChange={(e) => setPayout(e.target.value)} required />
            </div>
            <div className='input-control'>
                <label className='input-label'>Mobile Number</label>
                <input type="number" name='phNo' value={phNo} autocomplete="off" maxLength={10} onChange={(e) => setphNo(e.target.value)} />
            </div>
            <div className='input-control'>
                <label className='input-label'>Date of Birth</label>
                <input type="date" name='dateOfbirth' value={dateOfbirth} onChange={(e) => setDateOfbirth(e.target.value)} />
            </div>

            <button className='button'>Submit</button>
        </form>
        <ToastContainer 
          style={{position: "fixed", top: "5%", left: "0"}}
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
  )
}

export default AddUser