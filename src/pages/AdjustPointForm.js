import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import TransactionTable from '../components/TransactionTable'
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import Select from "react-select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useLocation, useParams } from "react-router-dom";
import { getCookie, getRole } from "../utils/auth";
import AdjustPointButton from "../components/AdjustPointButton";
import { Button } from "@mui/material";

const AdjustPointForm = () => {
  const location = useLocation()
  const {userRole} = useParams()

  const [users, setUsers] = useState();
  const [transactionType, setTransactionType] = useState(location?.state?.transactionType ?? "");
  const [comment, setComment] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState({
    label: `${location?.state?.userName} (Balance:${location?.state?.balance})`, 
    value: location?.state?.selectedPlayer
  } ?? null);
  const [amt, setAmt] = useState();
  const [role, setRole] = useState(location?.state?.userRole ?? "")
  const [loggedUserRole, setloggedUserRole] = useState('')

  const loggedUser = getCookie("token");
  // console.log(loggedUser);
  (async () => {
    const loggedUserRole = await getRole(loggedUser);
    setloggedUserRole(loggedUserRole)
  })();
  
  // console.log(location.state)
  // console.log(userRole)
  // console.log(loggedUser)

  useEffect(() => {
    if(role?.toLowerCase() !== userRole){
      setSelectedPlayer(null)
      setTransactionType("")
    }
  }, [userRole]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/usersunderme`,
        {
          userID: loggedUser,
        }
      );
      setUsers(
        res.data?.userUnderMe
          .filter((user) => user.userRole.toLowerCase() === userRole)
          .map((user) => {
            return {
              id: user.userID,
              userName: user.userName,
              balance: user.balance
            };
          })
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedPlayer, transactionType, amt)
  const transactionHandler = async (e) => {
    e.preventDefault();
    console.log(selectedPlayer, transactionType, amt)
    
    if (parseInt(amt) <= 0) {
      alert("Enter correct Amount");
      // return
    }
    
    if (transactionType === "") {
      alert("Enter type of transfer(Adjust)");
      // return
    }
    
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/pointstransfer",
        {
          loggedUser: loggedUser,
          selectedPlayer: selectedPlayer?.value,
          transactionType: transactionType,
          amount: parseInt(amt),
          comment: comment,
        }
      );
      setAmt("")
      setTransactionType("")
      setComment("")
      setSelectedPlayer(null)

      // console.log("............", res);
      if (res.data.Message !== "SUCCESS") {
        console.log(res.data)
          toast.error(res.data.message);
          return;
        }

      toast.success(
        `Points ${
          transactionType === "add" ? "added" : "deducted"
        } successfully`
      );

      loadUserData()

    } catch (err) {
      console.log(err);
    }
  };

  const options = 
    users?.map((user) => ({
      value: user?.id,
      label: `${user.userName} (Balance:${user.balance})`
    })) 
  
  // console.log(selectedPlayer, transactionType, role)
  // console.log(role, userRole, role?.toLowerCase() === userRole)

  const defValue = role?.toLowerCase() === userRole ? 
  {
    label: location?.state?.userName ? `${location?.state?.userName} (Balance:${location?.state?.balance})` : "Select Below....", value: location?.state?.selectedPlayer ?? "" 
  } : {
    label: "Select Below..", value: ""
  }

  return (
    <>
      <AdjustPointButton />

      <div className="form-container">
        <h2>Adjust Points</h2>
        <form className="form" onSubmit={transactionHandler}>
          <div className="input-control">
            <label className="input-label">Choose <span style={{textTransform: 'capitalize'}}>{userRole}</span></label>
          </div>

          <Select 
            options={options}
            value={selectedPlayer}
            placeholder="Select Below..."
            defaultValue={defValue}
            onChange={(selectedPlayer) => {setSelectedPlayer(selectedPlayer)}}
            isSearchable={true}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: 'steelblue',
              }),
            }}
          />

          <div className="input-control" style={{marginTop: '12px'}}>
            <label className="input-label">Set Transaction Type</label>
            {/* <select
              name="transactionType"
              onChange={(e) => setTransactionType(e.target.value)}
            >
                <option>Select below...</option>
                <option value="add">Add</option>
                <option value="substract">Substract</option>
            </select> */}
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setTransactionType(e.target.value)}
                value={transactionType}
              >
                <FormControlLabel value="add" control={<Radio />} label="Add" />
                <FormControlLabel value="substract" control={<Radio />} label="Deduct" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className='input-control'>
            <label className='input-label'>Amount</label>
            <input type="number" name='amt' value={amt} placeholder="Enter Amount" min={1} onChange={(e) => setAmt(e.target.value)} />
          </div>

          <div className='input-control'>
            <label className='input-label'>Comment</label>
            <textarea name="comment" value={comment} rows="3" placeholder="Enter Comment" onChange={(e) => setComment(e.target.value)}></textarea>
          </div>

          <button className="button" style={{width: '100%', borderRadius: '5px', fontWeight: 'bold', backgroundColor: 'slateblue'}}>Submit</button>
        </form>
      </div>
      
      <ToastContainer
        style={{position: "fixed", top: "5%", right: "0"}}
        // position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark" 
    />
      <TransactionTable loggedUser={loggedUser} />
    </>
  );
};

export default AdjustPointForm;
