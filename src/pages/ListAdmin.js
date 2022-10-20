import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom' 
import { getCookie,getRole } from "../utils/auth";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";

import {Button} from 'react-bootstrap'
// import {getTo}
const ListAdmin = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [filterVal, setFilterVal] = useState();
  const history=useHistory();

  useEffect(() => {
    const getSUPERADMIN=async (hsitory)=>{

        const userID=getCookie("token");
    const loggedRole= await getRole(parseInt(userID));
    console.log("ROLE LOGGED IN",loggedRole);
    if(loggedRole!=="SUPERADMIN")
    {
        // alert("UNAUTHORIZED ACCESS")
        history.push("/distributor/list")
    }
    }
    getSUPERADMIN(history);
    loadUserData();

  }, []);



  const loadUserData = async () => {
    return await axios
      .post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getplayers`,{
          userRole:"ADMIN"
        }
      )
      .then((response) => {
        setData(response.data);
        setValue(response.data);
      })
      .catch((err) => console.error("Erroror", err));
  };
  console.log("data:", data.users);




//   const handleFilter = (e) => {
//     console.log(e.target.value)
//     if (e.target.value === "") {
//       setData(value);

//     } else {
//       const filterResult = data.users.filter((item) =>item.fullName.includes(e.target.value)
//     );
//       setData(filterResult);
//       // console.log("Result",filterResult)
//     }
//     setFilterVal(e.target.value);
//   };



  return (
    <MDBContainer>
      <div style={{ marginTop: "80px" }}>
        <h1 className="text-center mb-5 text-muted"> Administrators </h1>
  
     {/* <input className="mb-2" placeholder="search..."  value={filterVal} onInput={(e)=>handleFilter(e)}/> */}
    
       
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">User Id</th>
                  <th scope=" col ">Email </th>
                  <th scope=" col "> Name </th>
                  <th scope=" col "> Balance </th>
                  <th scope=" col ">Registered On </th>
                  <th scope=" col ">Modify Distributor </th>
                  <th scope=" col "> Status </th>
                  <th scope=" col "> Blocked </th>
                  <th scope=" col "> Verified </th>
                </tr>
              </MDBTableHead>

              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-8">
                  <tr>
                    <td colspan={8} className=" text-center mb-8">
                      {" "}
                      Loading admins...{" "}
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.players.Items.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <td> {item.userID} </td>
                      <td> {item.email} </td>
                      <td>{item.fullName}</td>
                      <td>{item.balance}</td>
                      <td> {item.registeredOn} </td>
                      <td> <Link to={`/admin/modify/${item.userID}/${item.deviceID}`}><Button variant="secondary">edit</Button></Link></td>
                      <td> {item.userStatus} </td>
                      <td> {item.blocked} </td>
                      <td> {item.verified} </td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default ListAdmin;
