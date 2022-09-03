import React, { useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
const PlayerList = () => {

  const [data, setData] = useState();
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    return await axios
      .post(
        `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getplayers`,{
          userRole:"PLAYER"
        }
      )
      .then((response) => {
        
        if(response.data){
          setData(response.data.players.Items);
        }
      })
      .catch((err) => console.error("Erroror", err));
  };
  
  const columns = [
    {
      dataField: "userID",
      text: "User Id",
    },
    {
      dataField: "userRole",
      text: "User Role",
    },
    {
      dataField: "fullName",
      text: "Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "balance",
      text: "Balance",
    },
    {
      dataField: "commPercent",
      text: "Commision Percent(%)",
    },
    {
      dataField: "userStatus",
      text: "Status",
    },
    console.log("Dtatat",data)
  ];
  return (
    //  <BootstrapTable  keyField="userID" data={data}  columns={columns}/>
    <div >
    <BootstrapTable  keyField="userID" data={data}  bootstrap4={true} columns={columns}/>
    </div>
  );
};

export default PlayerList;
