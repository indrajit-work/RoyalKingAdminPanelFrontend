import React, { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { DataGrid } from "@mui/x-data-grid";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment/moment';
import DashboardInfo from './DashboardInfo';
import users from '../images/sidebarIcons/human_resources.png'
import online from '../images/sidebarIcons/status_available.png'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getCookie } from '../utils/auth';

const DataTable = styled.div`
  padding: 0 5rem;
  margin: 3rem auto;
  /* width: 30rem; */
  @media (max-width: 768px) {
    height: 300px;
    padding: 0 1rem;
  }
`;

const Title = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2rem;
  color: #b92d2d;
`

const BoxWrapper = styled.div`
  background-color: ${({background}) => background};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin: 2rem 5rem 3rem 5rem;
  @media (max-width: 625px) {
    margin: 1rem;
  }
`

const OnlineUsers = () => {
  const [pageSize, setPageSize] = useState(25);
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentOnlineUsers, setCurrentOnlineUsers] = useState(0)

  const loggedUser = getCookie("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.post('https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/usersunderme',{
          userID: loggedUser
        });

        setOnlineUsers(res.data?.userUnderMe?.filter(user => Boolean(user?.userStatus) && user?.userRole === "PLAYER" && user?.userStatus !== "online" && moment(Date.now()).format('l') === moment(user?.userStatus).format('l')));
      } catch (error) {
        console.error(error)
      }
    };
    fetchUsers()
  }, [onlineUsers.length]);

  useEffect(() => {
    setCurrentOnlineUsers(onlineUsers?.filter(user => Date.now() - new Date(user?.userStatus).getTime() <= 300000))
  }, [onlineUsers.length])

  // console.log(currentOnlineUsers.length)

  const onlineUsersCol = [
    { field: "userID", headerName: "User ID"},
    { field: "userName", headerName: "Username", minWidth: 100, flex: 1, sortable: false},
    // { field: "userRole", headerName: "Role", minWidth: 50, flex: 1, sortable: false},
    { field: "balance", headerName: "Balance", minWidth: 120, flex: 1,},
    { field: "LastGame", headerName: "Last Game", minWidth: 110, flex: 1, sortable: false,},
    {
      field: "userStatus", headerName: "Last Activity / Online Status", minWidth: 200, flex: 1, sortable: false,
      renderCell: (params) => {
        return (
          <>
            {Date.now() - new Date(params?.value).getTime() >= 300000 
            ? <span>{moment(params?.value).format('LTS')}</span>
            : <>
              {/* {setCurrentOnlineUsers(prev => prev + 1)} */}
              <GoPrimitiveDot style={{ color: '#00ee00' }} />
            </>
            }
          </>
        )
      }
    },
    {
      field: "", headerName: "Adjust Points", minWidth: 160, flex: 1, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: `/adjustpoints/${params.row.userRole.toLowerCase()}`, 
              state: {
                transactionType: 'add', 
                userRole: params.row.userRole,
                selectedPlayer: params.row.userID,
                userName: params.row.userName,
                balance: params.row.balance
              }
            }}>
              <Button variant="contained" color="success" size='small'>
                Add
              </Button>
            </Link>&nbsp;
            <Link to={{pathname: `/adjustpoints/${params.row.userRole.toLowerCase()}`, 
              state: {
                transactionType: 'substract', 
                userRole: params.row.userRole,
                selectedPlayer: params.row.userID,
                userName: params.row.userName,
                balance: params.row.balance
              }
            }}>
              <Button variant="outlined" color="error" size='small'>
                Deduct
              </Button>
            </Link>
          </>
        )
      }
    },
  ]

  // console.log(currentOnlineUsers)

  return (
    <>
      <Title>Today's Summary</Title>
      <BoxWrapper>
        <DashboardInfo title='Current Online Players' icon={online} background='#be8900' number={currentOnlineUsers?.length} />
        <DashboardInfo title="Total Online Players" icon={users} background='#7078b8' number={onlineUsers?.length} />
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
          sx={{
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '&.MuiDataGrid-root': {
              border: 'none',
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