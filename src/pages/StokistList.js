import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import { userColumns } from "../utils/TableDataSource";
import {FaUserEdit} from 'react-icons/fa'

const DataTable = styled.div`
  min-height: 600px;
  height: 90vh;
  padding: 0 3rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    height: 500px;
    padding: 0 8px;
  }
`;

const ModifyLink = styled.div`
  background-color: #7334e9;
  color: #fff;
  padding: 8px 1rem;
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
  // console.log(loggedUserRole)
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState({
    status: false,
    msg: ''
  })
  const [pageSize, setPageSize] = useState(10);

  const modifyColumn = [
    {
      field: "modify",
      headerName: `Modify ${userType}`,
      minWidth: 120,
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          stokistList.filter(stokist => stokist.userID === params.id).map((user, i) => (
            <Link
              to={`/editUser/${user?.userID}/${user?.deviceID ? user?.deviceID : undefined}`}
              style={{ textDecoration: "none" }}
              key={i}
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

  const stokistList = userList.filter(user => user.userRole === 'STOKIST')
  // console.log(stokistList);

  return (
    <>
      <h1 className="text-center my-5 text-muted">{userType}s</h1>
      {userList?.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Users Found</p>
      ) : (
        <DataTable>
          <DataGrid
            rows={stokistList}
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

export default ListDistributor;