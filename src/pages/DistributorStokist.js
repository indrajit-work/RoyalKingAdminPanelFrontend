import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TurnOverTable from "../components/TurnOverTable";

const DistributorStokist = () => {
  const params = useParams();

  const userID = params.userID;
  const gameType = params.gameType
  const from = params.from
  const to = params.to
  
  // useEffect(() => {
  //   const getSt = async () => {
  //     try {
  //       const res = await axios.post(
  //         "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/turnover",
  //         {
  //           userID: userID,
  //           from: from,
  //           to: to,
  //           gameType: gameType
  //         })
  //       console.log(res.data)
  //       setGameData(res.data.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   getSt()
  // }, [])
  
  console.log("dist-stok ", userID, from, to, gameType)
  // console.log("......", gameData)

  return (
    <>
      <TurnOverTable userID={userID} from={from} to={to} gameType={gameType} role='Stokist' link={`/stokist/player/`} />
    </>
    
  );
};

export default DistributorStokist;