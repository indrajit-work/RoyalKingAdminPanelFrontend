import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCookie } from "../utils/auth";

const DataTable = styled.div`
  width: 90vw;
  height: 800px;
  padding: 3rem;
  margin: 0 auto;
`;

const userColumns = [
  { field: "id", headerName: "Transaction ID", width: 200 },
  { field: "transactionDateReadable", headerName: "Transaction Date", width: 250 },
    { field: "senderID", headerName: "Sender", width: 130 },
    { field: "recieverID", headerName: "Receiver", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "comment", headerName: "Comment", width: 300, sortable: false }
]

const TransactionTable = ({loggedUser}) => {
    const [transactionList, setTransactionList] = useState([])

  const bossID = getCookie("token");
//   console.log(bossID)

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
        const res = await axios.post(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gettransactions`,
          {
            userRole: "ADMIN",
            bossID: bossID,
          }
        );
    
        console.log("res.data", res.data.users)
      
        setTransactionList(res.data?.users?.map(transactionList => {
          return {
            ...transactionList, 
            id: transactionList.transactionID
          }
        }))
    } catch (error) {
        console.log("error: ", error)
    }
  };

  console.log(setTransactionList)

  return (
    <div>
      <DataTable>
        <DataGrid
          rows={transactionList}
          columns={userColumns}
          pageSize={20}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
        ></DataGrid>
      </DataTable>
    </div>
  );
};

export default TransactionTable;
