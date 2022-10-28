import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { userColumns } from "../utils/TableDataSource";
import {FaUserEdit} from 'react-icons/fa'

const DataTable = styled.div`
  min-height: 500px;
  height: 600px;
  width: 100vw;
  padding: 0 3rem;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin: 0 auto;
  }
`;

const ModifyLink = styled.div`
  background-color: #7334e9;
  color: #fff;
  padding: 8px 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: white;
    color: #7334e9;
    border: 1px solid #7334e9;
  }
`;

const ListPlayer = ({userType, loggedUser, loggedUserRole}) => {
  const [userList, setUserList] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const modifyColumn = [
    {
      field: "modify",
      headerName: `Modify ${userType}`,
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          playerList.filter(player => player.userID === params.id).map((user) => (
            <Link
              to={`/editUser/${user.userID}/${user.deviceID ? user.deviceID : undefined}`}
              style={{ textDecoration: "none" }}
            >
              <ModifyLink><FaUserEdit /> Edit</ModifyLink>
            </Link>
          ))
        )
      },
    },
  ];

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
      setUserList(
        res.data?.userUnderMe.map((user) => {
          return {
            ...user,
            id: user.userID,
          };
        })
      );

      console.log("users: ", userList);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userList);
  const playerList = userList.filter(user => user.userRole === 'PLAYER')
  console.log(playerList);

  return (
    <>
      <h1 className="text-center my-5 text-muted">{userType}s</h1>
      {userList?.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <DataTable>
          <DataGrid
            rows={playerList}
            columns={userColumns.concat(modifyColumn)}
            rowsPerPageOptions={[10, 25, 50]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection={false}
          ></DataGrid>
        </DataTable>
      )}
    </>
  );
};

export default ListPlayer;
