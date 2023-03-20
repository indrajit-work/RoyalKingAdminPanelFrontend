import React, { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { DataGrid } from "@mui/x-data-grid";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment/moment';
import DashboardInfo from './DashboardInfo';
import users from '../images/sidebarIcons/human_resources.png'
import online from '../images/sidebarIcons/status_available.png'

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

const BoxWrapper = styled.div`
  background-color: ${({background}) => background};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin: 5rem;
  @media (max-width: 625px) {
    margin: 1rem;
  }
`

const OnlineUsers = () => {
  const [pageSize, setPageSize] = useState(25);
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentOnlineUsers, setCurrentOnlineUsers] = useState(0)

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
  }, [onlineUsers]);

  
  useEffect(() => {
    setCurrentOnlineUsers(onlineUsers?.filter(user => Date.now() - new Date(user?.userStatus).getTime() <= 300000))
  }, [onlineUsers])
  
  // console.log(currentOnlineUsers.length)

  const onlineUsersCol = [
    { field: "userID", headerName: "User ID", minWidth: 30},
    { field: "userName", headerName: "Username", minWidth: 80, flex: 1, sortable: false},
    { field: "balance", headerName: "Balance", minWidth: 80, flex: 1,},
    { field: "LastGame", headerName: "Last Game", minWidth: 80, flex: 1, sortable: false,},
    {
      field: "userStatus", headerName: "Last Activity / Online Status", minWidth: 100, flex: 1, sortable: false,
      renderCell: (params) => {
        return (
          <>
            {Date.now() - new Date(params?.value).getTime() >= 300000 
            ? <p>{moment(params?.value).format('LTS')}</p>
            : <>
              {/* {setCurrentOnlineUsers(prev => prev + 1)} */}
              <GoPrimitiveDot style={{ color: '#00ee00' }} />
            </>
            }
          </>
        )
      }
    }
  ]

  // console.log(currentOnlineUsers)

  return (
    <>
      <BoxWrapper>
        <DashboardInfo title='Current Online Players' icon={online} background='#be8900' number={currentOnlineUsers.length} />
        <DashboardInfo title="Total Online Players" icon={users} background='#7078b8' number={onlineUsers.length} />
      </BoxWrapper>

      <DataTable>
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
          autoHeight={true}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pageSize={pageSize}
          headerClassName='super-app-theme--header'
          sx={{
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '&.MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-root::-webkit-scrollbar': {
              display: 'none !important',
            },
            '& .MuiDataGrid-root::-webkit-scrollbar-thumb': {
              display: 'none !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#9c4c29',
            },
          }}
        ></DataGrid>
      </DataTable>
    </>
  )
}

export default OnlineUsers