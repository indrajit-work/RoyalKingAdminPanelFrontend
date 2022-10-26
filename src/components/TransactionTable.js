import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCookie, getRole } from "../utils/auth";
import {MdRefresh} from 'react-icons/md'

const DataTable = styled.div`
  width: 100vw;
  height: 800px;
  padding: 3rem;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin: 0 auto;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 10%;
  top: 7%;
  font-size: 1rem;
  background-color: transparent;
  color: steelblue;
  border: none;
  z-index: 999;
  @media screen and (max-width: 768px) {
    top: 3%;
  }
`

const userColumns = [
  { field: "id", headerName: "Transaction ID", width: 150, sortingOrder: ['desc', 'asc'] },
  { field: "transactionDateReadable", headerName: "Transaction Date", width: 250 },
    { field: "senderID", headerName: "Sender", width: 130 },
    { field: "recieverID", headerName: "Receiver", width: 130 },
    { field: "amount", headerName: "Amount", width: 180 },
    { field: "comment", headerName: "Comment", width: 300, sortable: false }
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const TransactionTable = ({loggedUser}) => {
  const [transactionList, setTransactionList] = useState([])
  const [pageSize, setPageSize] = useState(10)

  const [userRole, setUserRole] = useState('');

  const bossID = getCookie("token");
//   console.log(bossID)

  useEffect(() => {
    loadUserData();
  }, []);

    // current user
  // const loggedUser = getCookie("token");
  console.log("logeed in", loggedUser);

  (async () => {
    const role = await getRole(loggedUser);
    setUserRole(role)
  })();

  console.log("ROLE LOGGED IN", userRole);

  const loadUserData = async () => {
    try {
        const res = await axios.post(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gettransactions`,
          {
            userRole: loggedUser,
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

  // console.log(transactionList)

  return (
    <div style={{position: 'relative'}}>
      <Button title='Refresh' onClick={loadUserData}>
        Refresh <MdRefresh />
      </Button>


      <DataTable>
        <DataGrid
          rows={transactionList}
          columns={userColumns}
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection={false}
          components={{ Toolbar: CustomToolbar }} 
          // onSortModelChange={(model) => setSortModel(model)}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: 'id',
                  sort: 'desc',
                },
              ],
            },
          }}
        ></DataGrid>
      </DataTable>
    </div>
  );
};

export default TransactionTable;
