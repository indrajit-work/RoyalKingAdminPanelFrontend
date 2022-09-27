import { Route, Switch, Redirect, Router } from "react-router-dom";
import { isAuth } from "./utils/auth";
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
import Turnover from "./pages/Turnover";
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

function App() {
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
            <Sidebar/>
            <Dashboard/>
          
          </Route>
          <Route path="/profile" exact>
            <Sidebar/>
            <Dashboard/>

          </Route>
          <Route path="/profile/changepassword" exact>
            <Sidebar/>
            <ChangePassword/>
          </Route>
          <Route path="/distributor/create" exact>
            <Sidebar/>
                <RegDistributor/>
          
          </Route>
          <Route path="/distributor/list" exact>
            <Sidebar/>
            <ListDistributor/>

          </Route>
          <Route path="/stokist/list" exact>
            <Sidebar/>
            <StokistList/>

          </Route>
          <Route path="/stokist/create" exact>
            <Sidebar/>
            <RegStokist/>
          </Route>
          <Route path="/player/create" exact>
            <Sidebar/>
            <RegPlayer/>
          </Route>
          <Route path="/player/list" exact>
            <Sidebar/>
           <ListPlayer/>
          </Route>

          <Route path="/turnover" exact>
            <Sidebar/>
            <Turnover/>

          </Route>

          
          <Route path="/admin/distributor/:userID/:commPercent" exact>
            <Sidebar/>
            <AdminDistributor/>
          </Route>

          <Route path="/distributor/stokist/:userID/:commPercent" exact>
            <Sidebar/>
            <DistributorStokist/>
          </Route>
          <Route path="/stokist/player/:userID/:commPercent" exact>
            <Sidebar/>
            <StokistPlayer/>
          </Route>

          <Route path="/gamesettings" exact>
            <Sidebar/>
            <GameSettings/>
            
          </Route>

          <Route path="/broadcastMessage" exact>
            <Sidebar/>
            <Broadcast/>
            
          </Route>
          
          <Route path="/adjustpointsAdmin" exact>
            <Sidebar/>
            <AdjustPointsAdmin/>
            
          </Route>
          
          <Route path="/adjustpointDistributor" exact>
            <Sidebar/>
            <AdjustDistributor/>
            
          </Route>

          <Route path="/adjustpointStokist" exact>
            <Sidebar/>
            <AdjustStokist/>
            
          </Route>

          <Route path="/adjustpointPlayers" exact>
            <Sidebar/>
            <AdjustPlayer/>
            
          </Route>

          <Route path="/player/modify/:userID/:deviceID" exact>
            <Sidebar/>
            <ModifyPlayer/>
            
          </Route>
          <Route path="/distributor/modify/:userID/:deviceID" exact>
            <Sidebar/>
            <ModifyDistributor/>
            
          </Route>
          <Route path="/stokist/modify/:userID/:deviceID" exact>
            <Sidebar/>
            <ModifyStokist/>
            
          </Route>
          <Route path="/gameHistory" exact>
            <Sidebar/>
            <Gamehistory/>
            
          </Route>
          <Route path="/tickethistory/:id/:type/:value/:endValue" exact>
            <Sidebar/>
           <TicketHistoryById/>
            
          </Route>
          <Route path="/gameResult" exact>
            <Sidebar/>
           <GameResult/>
            
          </Route>
          
        </Switch>
    </>
  );
}

export default App;
