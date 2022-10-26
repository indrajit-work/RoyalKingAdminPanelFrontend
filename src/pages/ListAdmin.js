import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCookie, getRole } from "../utils/auth";
import { userColumns } from "../utils/TableDataSource";
import {FaUserEdit} from 'react-icons/fa'

const DataTable = styled.div`
  min-height: 500px;
  height: 80vh;
  padding: 0 3rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    height: 300px;
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

const ListAdmin = ({ userType, loggedUser, loggedUserRole }) => {
  const [userList, setUserList] = useState([]);
  const [pageSize, setPageSize] = useState(10)

  const history = useHistory();

  // console.log(userList)

  const modifyColumn = [
    {
      field: "modify",
      headerName: `Modify ${userType}`,
      width: 370,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          adminList.filter(admin => admin.userID === params.id).map((user) => (
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

  //current user
  // useEffect(() => {
  //   const getUserRole = async () => {
  //     const loggedUser = getCookie("token");
  //     const loggedUserRole = await getRole(parseInt(loggedUser));
  //     console.log("logeed in", loggedUser);
  //     console.log("ROLE", loggedUserRole);
  //   }

  //   getUserRole()
  // }, [])

  //current user
  // const loggedUser = getCookie("token");
  // console.log("logeed in", loggedUser);

  // (async () => {
  //   const role = await getRole(loggedUser);
  //   setUserRole(role)
  // })();

  // console.log("ROLE LOGGED IN", userRole);

  // useEffect(() => {
    // const getSUPERADMIN = async (hsitory) => {
    //   const userID = getCookie("token");

      // if (loggedRole !== "SUPERADMIN") {
        // alert("UNAUTHORIZED ACCESS")
      //   history.push("/distributor/list");
      // }
    // };
    // getSUPERADMIN(history);
    // loadUserData();
  // }, []);

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
          console.log(user)
          return {
            ...user,
            id: user.userID,
          };
        })
      );
      console.log("res.data: ", res.data.userUnderMe);
      console.log("users: ", userList);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userList)
  const adminList = userList.filter(user => user.userRole === 'ADMIN')
  console.log(adminList);

  return (
    <>
      <h1 className="text-center my-5 text-muted">{userType}s</h1>
      {userList?.length === 0 
        ? <p style={{textAlign: 'center'}}>Loading...</p> 
        :
        <DataTable>
            <DataGrid
            rows={adminList}
            columns={userColumns.concat(modifyColumn)}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection={false}
            ></DataGrid>
        </DataTable>
      }
    </>
  );
};

export default ListAdmin;
