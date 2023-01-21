import { useParams } from "react-router-dom";
import TurnOverTable from "../components/TurnOverTable";

const StokistPlayer = () => {
  const params = useParams();

  const userID = params.userID;
  const gameType = params.gameType
  const from = params.from
  const to = params.to

  return (
    <>
      <TurnOverTable userID={userID} from={from} to={to} gameType={gameType} role='Player' />
    </>
    
  );
};

export default StokistPlayer;