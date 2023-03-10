import React, { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { DataGrid } from "@mui/x-data-grid";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment/moment';

const DataTable = styled.div`
  min-height: 500px;
  height: 80vh;
  padding: 0 5rem;
  margin: 3rem auto;
  /* width: 30rem; */
  @media (max-width: 768px) {
    height: 300px;
    padding: 0 1rem;
  }
`;

const OnlineUsers = () => {
  const [pageSize, setPageSize] = useState(25);
  const [onlineUsers, setOnlineUsers] = useState([])
  // const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getallusers');

        setOnlineUsers(res.data.users.filter(user => Boolean(user?.userStatus) && user.userRole === "PLAYER" && user?.userStatus !== "online" && moment(Date.now()).format('l') === moment(user?.userStatus).format('l')));
      } catch (error) {
        console.error(error)
      }
    };
    fetchUsers()
  }, [onlineUsers.length]);

  const onlineUsersCol = [
    { field: "userID", headerName: "User ID", minWidth: 30},
    { field: "userName", headerName: "Username", minWidth: 80, flex: 1, sortable: false,},
    {
      field: "userStatus", headerName: "Last Activity / Online Status", minWidth: 100, flex: 1, sortable: false,
      renderCell: (params) => {
        return (
          <>
            {Date.now() - new Date(params?.value).getTime() >= 300000 
            ? <p>{moment(params?.value).format('LTS')}</p>
            : <><GoPrimitiveDot style={{ color: '#00ee00' }} /></>
            }
          </>
        )
      }
    }
  ]

  return (
    <>
      <DataTable>
        <h2 style={{ textAlign: 'center' }}>Today's Total Loggedin Players: 
          <span style={{color: '#00aa00', fontWeight: '700'}}> {onlineUsers?.length}</span>
        </h2>
        <DataGrid
          rows={onlineUsers}
          columns={onlineUsersCol}
          getRowId={(row) => row.userID}
          columnVisibilityModel={{
            userID: false
          }}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: 'userStatus',
                  sort: 'desc',
                },
              ],
            },
          }}
          checkboxSelection={false}
          rowsPerPageOptions={[25, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pageSize={pageSize}
        ></DataGrid>
      </DataTable>
    </>
  )
}

export default OnlineUsers