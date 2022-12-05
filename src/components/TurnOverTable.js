import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

const DataTable = styled.div`
  min-height: 500px;
  height: 90vh;
  padding: 0 5rem;
  margin: 3rem auto;
  @media (max-width: 768px) {
    height: 500px;
    padding: 0 1rem;
  }
`;

const loggedUserTOCol = [
    { field: "userID", headerName: "User ID", minWidth: 80, flex: 1 },
    { field: "userName", headerName: "Username", minWidth: 100, flex: 1 },
    { field: "totalPlayed", headerName: "Play Point", minWidth: 120, flex: 1 },
    { field: "totalWin", headerName: "Win Point", minWidth: 120, flex: 1 },
    {
      field: "",
      headerName: "End",
      minWidth: 120,
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return(
          <>{params.row.totalPlayed - params.row.totalWin}</>
        )
      }
    },
    { field: "comPercent", headerName: "Commission Amount", minWidth: 160, flex: 1 },
    { field: "netProfit", headerName: "Net to Pay", minWidth: 120, flex: 1 },
  ];

const TurnOverTable = ({ userID, from, to, gameType, role, link }) => {
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState("")
  const [usersUnder, setUsersUnder] = useState([])

  const viewDetailsCol = [
    {
      field: "details",
      headerName: '',
      width: 130,
      sortable: false,
      renderCell: (params) => {
        return(
          <Link to={`${link}${params.row.userID}/${from}-to-${to}/${gameType}`}>
            <Button disabled={!link} variant="secondary" size="sm">View Details</Button>
          </Link>
        )
      }
    }
  ]

  useEffect(() => {
    getSt();
  }, []);

  const getSt = async () => {
      setLoading('Loading...')
    try {
      const res = await axios.post(
        "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/turnover",
        {
          userID: userID,
          from: from,
          to: to,
          gameType: gameType,
        }
      );
      setGameData(res.data?.data);
      setUsersUnder(res.data?.data?.childTurnOverArray.map(user => {
        return{
          id: user.userID,
          comPercent: user.comPercent.toFixed(2),
          netProfit: user.netProfit.toFixed(2),
          ...user,
        }
      }))
    } catch (error) {
      console.log(error);
    }finally{
        setLoading('');
    }
  };
  // console.log(usersUnder)

  return (
    <div>
        {
            loading !== '' ? (
                <p style={{display: 'grid', placeItems: 'center', margin: '0 auto', height: 'calc(100vh - 90px)', fontSize: '20px'}}>{loading}</p>
            ) :
            (
                <>
                    <table>
                        <tr>
                            <td>User ID</td>
                            <td>{userID}</td>
                        </tr>
                        <tr>
                            <td>Play Point</td>
                            <td>{gameData.totalPlayed}</td>
                        </tr>
                        <tr>
                            <td>Win Point</td>
                            <td>{gameData.totalWin}</td>
                        </tr>
                        <tr>
                            <td>Commission Amount</td>
                            <td>{gameData?.comPercent?.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Net to Pay</td>
                            <td>{gameData?.netProfit?.toFixed(2)}</td>
                        </tr>
                    </table>

                    <h1 className="text-center mt-5">{role}s</h1>
                    <DataTable>
                        <DataGrid
                        rows={usersUnder}
                        columns={loggedUserTOCol.concat(viewDetailsCol)}
                        checkboxSelection={false}
                        pageSize={25}
                        ></DataGrid>
                    </DataTable>
                </>
            )
        }
    </div>
  );
};

export default TurnOverTable;
