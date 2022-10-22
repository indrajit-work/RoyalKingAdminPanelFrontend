import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCookie, getRole } from "../utils/auth";
import { userColumns } from "../utils/TableDataSource";

const DataTable = styled.div`
  height: 400px;
  padding: 0 3rem;
  margin: 0 auto;
`;

const ModifyLink = styled.div`
  background-color: steelblue;
  color: #fff;
  padding: 8px 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: white;
    color: steelblue;
    border: 1px solid steelblue;
  }
`;

const ListAdmin = ({ userType }) => {
  const [userList, setUserList] = useState([]);
  const [pageSize, setPageSize] = useState(5)
  const history = useHistory();

  const modifyColumn = [
    {
      field: "modify",
      headerName: `Modify ${userType}`,
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/admin/modify/${userList.userID}/${userList.deviceID}`}
            style={{ textDecoration: "none" }}
          >
            <ModifyLink>Edit</ModifyLink>
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    const getSUPERADMIN = async (hsitory) => {
      const userID = getCookie("token");
      const loggedRole = await getRole(parseInt(userID));
      console.log("ROLE LOGGED IN", loggedRole);
      if (loggedRole !== "SUPERADMIN") {
        // alert("UNAUTHORIZED ACCESS")
        history.push("/distributor/list");
      }
    };
    getSUPERADMIN(history);
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const res = await axios.post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getplayers`,
        {
          userRole: "ADMIN",
        }
      );
      setUserList(
        res.data?.players?.Items?.map((user) => {
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

  return (
    <>
      <h1 className="text-center my-5 text-muted">{userType}s</h1>
      {userList?.length === 0 
        ? <p style={{textAlign: 'center'}}>Loading...</p> 
        :
        <DataTable>
            <DataGrid
            rows={userList}
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
