import { Route, Switch, Redirect, Router } from "react-router-dom";
import './App.css'
import { getCookie, getRole, isAuth } from "./utils/auth";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import ListDistributor from "./pages/ListDistributor";
import RegDistributor from "./pages/RegDistributor";
import StokistList from "./pages/StokistList";
import RegStokist from "./pages/RegStokist";
import PlayerList from "./pages/PlayerList";
import ListPlayer from "./pages/ListPlayers";
import RegPlayer from "./pages/RegPlayer";
import AdminDistributor from "./pages/AdminDistributor";
// import Turnover from "./pages/Turnover";
import DistributorStokist from "./pages/DistributorStokist";
import StokistPlayer from "./pages/StokistPlayer";
import GameSettings from "./pages/GameSettings";
import Broadcast from "./pages/Broadcast";
import AdjustPointsAdmin from "./pages/AdjustPointsAdmin";
import AdjustDistributor from "./pages/AdjustDistributor";
import AdjustStokist from "./pages/AdjustStokist";
import AdjustPlayer from "./pages/AdjustPlayer";
import ModifyPlayer from "./pages/ModifyPlayer";
import ModifyDistributor from "./pages/ModifyDistributor";
import ModifyStokist from "./pages/ModifyStokist";
import Gamehistory from "./pages/Gamehistory";
import TicketHistoryById from "./pages/TicketHistoryById";
import GameResult from "./pages/GameResult";
import RegAdmin from "./pages/RegAdmin";
import ListAdmin from "./pages/ListAdmin";
import AdminModify from "./pages/AdminModify";
import UserTable from "./pages/UserTable";
import CreateUser from "./pages/CreateUser";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import CleanData from "./pages/CleanData";
import { useState } from "react";
import AdjustPoints from "./pages/AdjustPoints";
import Turnover2 from "./pages/Turnover2";

function App() {
  const [loggedUserRole, setloggedUserRole] = useState('')

  // get loggedin user id
  const loggedUser = getCookie("token");
  console.log("logeed in", loggedUser);

  // get logged user role
  (async () => {
    const role = await getRole(loggedUser);
    setloggedUserRole(role)
  })();
  console.log(loggedUserRole);

  return (
    <>
      <Route path="/login" exact>
        <Login />
      </Route>

      <Switch>
        {/* <Sidebar/> */}
        {/* {isAuth() && <Sidebar/>} */}

        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>

        <Route path="/dashboard" exact>
          <Sidebar />
          <Dashboard />
        </Route>

        <Route path="/profile" exact>
          <Sidebar />
          <Dashboard />
        </Route>

        <Route path="/userManager" exact>
          <Sidebar />
          <UserTable />
        </Route>

        <Route path="/changepassword" exact>
          <Sidebar />
          <ChangePassword />
        </Route>

        <Route path="/addUser" exact>
          <Sidebar />
          <AddUser />
        </Route>

        <Route path="/editUser/:userID/:deviceID" exact>
          <Sidebar />
          <EditUser />
        </Route>

        <Route path="/distributor/list" exact>
          <Sidebar />
          <ListDistributor />
        </Route>
        <Route path="/stokist/list" exact>
          <Sidebar />
          <StokistList />
        </Route>
    
        <Route path="/player/list" exact>
          <Sidebar />
          <ListPlayer />
        </Route>

        <Route path="/turnover" exact>
          <Sidebar />
          <Turnover2 />
        </Route>

        <Route path="/admin/distributor/:userID/:from-to-:to/:gameType" exact>
          <Sidebar />
          <AdminDistributor />
        </Route>

        <Route path="/distributor/stokist/:userID/:from-to-:to/:gameType" exact>
          <Sidebar />
          <DistributorStokist />
        </Route>
        <Route path="/stokist/player/:userID/:from-to-:to/:gameType" exact>
          <Sidebar />
          <StokistPlayer />
        </Route>

        <Route path="/gamesettings" exact>
          <Sidebar />
          <GameSettings />
        </Route>

        <Route path="/broadcastMessage" exact>
          <Sidebar />
          <Broadcast />
        </Route>

        <Route path="/adjustpoints" exact>
          <Sidebar />
          <AdjustPoints />
        </Route>

        <Route path="/player/modify/:userID/:deviceID" exact>
          <Sidebar />
          <ModifyPlayer />
        </Route>
        <Route path="/distributor/modify/:userID/:deviceID" exact>
          <Sidebar />
          <ModifyDistributor />
        </Route>
        <Route path="/stokist/modify/:userID/:deviceID" exact>
          <Sidebar />
          <ModifyStokist />
        </Route>
        <Route path="/gameHistory" exact>
          <Sidebar />
          <Gamehistory />
        </Route>
        <Route path="/tickethistory/:id/:type/:value/:endValue" exact>
          <Sidebar />
          <TicketHistoryById />
        </Route>
        <Route path="/gameResult" exact>
          <Sidebar />
          <GameResult />
        </Route>
        <Route path="/regAdmin" exact>
          <Sidebar />
          <RegAdmin />
        </Route>
        <Route path="/listAdmin" exact>
          <Sidebar />
          <ListAdmin />
        </Route>

        <Route path="/admin/modify/:userID/:deviceID" exact>
          <Sidebar />
          <AdminModify />
        </Route>

        <Route path="/cleanData" exact>
          <Sidebar />
          <CleanData />
        </Route>
      </Switch>
    </>
  );
}

export default App;
