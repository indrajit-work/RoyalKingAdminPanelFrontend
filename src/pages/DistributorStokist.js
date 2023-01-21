import React from "react";
import { useParams } from "react-router-dom";
import TurnOverTable from "../components/TurnOverTable";

const DistributorStokist = () => {
  const params = useParams();

  const userID = params.userID;
  const gameType = params.gameType
  const from = params.from
  const to = params.to
  
  // console.log("dist-stok ", userID, from, to, gameType)
  // console.log("......", gameData)

  return (
    <>
      <TurnOverTable userID={userID} from={from} to={to} gameType={gameType} role='Stokist' link={`/stokist/player/`} />
    </>
    
  );
};

export default DistributorStokist;