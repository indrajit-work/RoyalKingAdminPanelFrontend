import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import TransactionTable from '../components/TransactionTable'

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
            console.log(user);
            return {
              ...user,
              id: user.userID,
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

      console.log("............", res);
      if (res.data.Message !== "SUCCESS") {
          toast.error(res.data.message);
          return;
        }

      toast.success(
        `Points ${
          transactionType === "add" ? "added" : "deducted"
        } successfully`
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Adjust Points</h2>
        <form className="form" onSubmit={transactionHandler}>
          <div className="input-control">
            <label className="input-label">Choose {userRole}</label>
            <select
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
              
            </select>
          </div>

          <div className="input-control">
            <label className="input-label">Adjust</label>
            <select
              name="transactionType"
              onChange={(e) => setTransactionType(e.target.value)}
            >
                <option>Select below...</option>
                <option value="add">Add</option>
                <option value="substract">Substract</option>
            </select>
          </div>

          <div className='input-control'>
            <label className='input-label'>Amount</label>
            <input type="number" name='amt' value={amt} autocomplete="off" placeholder="Enter Amount" min={1} onChange={(e) => setAmt(e.target.value)} />
          </div>

          <div className='input-control'>
            <label className='input-label'>Amount</label>
            <textarea name="comment" value={comment} rows="3" placeholder="Enter Comment" onChange={(e) => setComment(e.target.value)}></textarea>
          </div>

          <button className="button">Submit</button>
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
