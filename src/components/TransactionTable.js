import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCookie, getRole } from "../utils/auth";
import {MdRefresh} from 'react-icons/md'

const DataTable = styled.div`
  width: 100%;
  padding: 0 3rem 3rem;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding: 8px;
    margin: 0 auto;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 10%;
  top: 1%;
  font-size: 1rem;
  background-color: transparent;
  color: steelblue;
  border: none;
  z-index: 999;
  @media screen and (max-width: 768px) {
    top: 2%;
  }
`

const userColumns = [
  { field: "id", headerName: "Transaction ID", minWidth: 130, sortingOrder: ['desc', 'asc'], flex: 1 },
  { field: "transactionDateReadable", headerName: "Transaction Date", minWidth: 180, flex: 1 },
  { field: "senderID", headerName: "Sender", minWidth: 80, flex: 1 },
  { field: "recieverID", headerName: "Receiver", minWidth: 80, flex: 1 },
  { field: "amount", headerName: "Amount", minWidth: 100, flex: 1 },
  { field: "comment", headerName: "Comment", minWidth: 200, sortable: false, flex: 1 }
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
  const [pageSize, setPageSize] = useState(20)
  const [userRole, setUserRole] = useState('');

  const bossID = getCookie("token");

  useEffect(() => {
    loadUserData();
  }, []);

  (async () => {
    const role = await getRole(loggedUser);
    setUserRole(role)
  })();

  const loadUserData = async () => {
    try {
        const res = await axios.post(
          `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/gettransactions`,
          {
            userRole: loggedUser,
            bossID: bossID,
          }
        ); 
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

  return (
    <>
      <h2 style={{textAlign: 'center', paddingTop: '1rem'}}>Transaction List</h2>
      <div style={{position: 'relative'}}>
        <Button title='Refresh' onClick={loadUserData}>
          Refresh <MdRefresh />
        </Button>

        <DataTable>
          <DataGrid
            rows={transactionList}
            columns={userColumns}
            rowsPerPageOptions={[20, 30, 40, 50]}
            pageSize={pageSize}
            autoHeight={true}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection={false}
            components={{ Toolbar: CustomToolbar }} 
            // onSortModelChange={(model) => setSortModel(model)}
            sx={{
              '.MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '&.MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'steelblue',
              },
            }}
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
    </>
  );
};

export default TransactionTable;
