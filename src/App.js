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
          <Route path="/player/list" exact>
            <Sidebar/>
           <ListPlayer/>
          </Route>
          
        </Switch>
    </>
  );
}

export default App;
