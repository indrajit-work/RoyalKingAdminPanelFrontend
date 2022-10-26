import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import { userColumns } from "../utils/TableDataSource";
import {FaUserEdit} from 'react-icons/fa'

const DataTable = styled.div`
  min-height: 500px;
  height: 80vh;
  padding: 0 3rem;
  margin: 0 auto;
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

const ListDistributor = ({userType, loggedUser, loggedUserRole}) => {
  const [userList, setUserList] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const modifyColumn = [
    {
      field: "modify",
      headerName: `Modify ${userType}`,
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          stokistList.filter(stokist => stokist.userID === params.id).map((user) => (
            <Link
              to={`/editUser/${user.userID}/${user.deviceID ? user.deviceID : undefined}`}
              style={{ textDecoration: "none" }}
            >
              <ModifyLink><FaUserEdit /> Edit</ModifyLink>
            </Link>
          ))
        );
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
  const stokistList = userList.filter(user => user.userRole === 'STOKIST')
  console.log(stokistList);

  return (
    <>
      <h1 className="text-center my-5 text-muted">{userType}s</h1>
      {userList?.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <DataTable>
          <DataGrid
            rows={stokistList}
            columns={userColumns.concat(modifyColumn)}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection={false}
          ></DataGrid>
        </DataTable>
      )}
    </>
  );
};

export default ListDistributor;