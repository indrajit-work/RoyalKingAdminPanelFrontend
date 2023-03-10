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

const AdjustPointForm = ({ userRole, loggedUser }) => {
  const [users, setUsers] = useState();
  const [transactionType, setTransactionType] = useState("");
  const [comment, setComment] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [amt, setAmt] = useState();

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
          .filter((user) => user.userRole === userRole)
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

  const transactionHandler = async (e) => {
    e.preventDefault();

    if (parseInt(amt) <= 0) {
      alert("Enter correct Amount");
      // return
    }

    if (transactionType === "") {
      alert("Enter type of transfer(Adjust)");
      // return
    }
    console.log(selectedPlayer, transactionType, typeof amt)
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/pointstransfer",
        {
          loggedUser: loggedUser,
          selectedPlayer: selectedPlayer,
          transactionType: transactionType,
          amount: parseInt(amt),
          comment: comment,
        }
      );
    //   setAmt("")
    //   setTransactionType("")
    //   setComment("")
    //   setSelectedPlayer(null)

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

  const options = users?.map((user) => ({
    value: user?.id,
    label: `${user.userName} (Balance:${user.balance})`
  }));
  // console.log(options)

  return (
    <>
      <div className="form-container">
        <h2>Adjust Points</h2>
        <form className="form" onSubmit={transactionHandler}>
          <div className="input-control">
            <label className="input-label">Choose <span style={{color: 'steelblue'}}>{userRole}</span></label>
            {/* <select
              name="selectedPlayer"
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="" disabled selected>
                Select below...
              </option>
              {!users ? (
                <option>No data...</option>
              ) : (
                users.map((item, index) => (
                  <option key={index} value={item.userID}>
                    {item.userName} (Balance:{item.balance})
                  </option>
                ))
              )}
            </select> */}

          </div>
            <Select 
              options={options}
              value={selectedPlayer?.value}
              onChange={(selectedPlayer) => {setSelectedPlayer(selectedPlayer.value)}}
              isSearchable={true}
              placeholder="Select Below..."
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

          <button className="button" style={{width: '100%', borderRadius: '5px', fontWeight: 'bold'}}>Submit</button>
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
