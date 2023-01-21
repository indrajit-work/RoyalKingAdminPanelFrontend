import React from "react";
import { useParams } from "react-router-dom";
import TurnOverTable from "../components/TurnOverTable";

const AdminDistributor = () => {
  const params = useParams();

  const userID = params.userID;
  const gameType = params.gameType;
  const from = params.from;
  const to = params.to;

  // console.log(userID, from, to, gameType);
  // console.log("......", gameData);

  return (
    <>
      <TurnOverTable userID={userID} from={from} to={to} gameType={gameType} role='Distributor' link={`/distributor/stokist/`} />
    </>
  );
};

export default AdminDistributor;
