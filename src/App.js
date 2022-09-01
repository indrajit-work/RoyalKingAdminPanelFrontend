import { Route, Switch, Redirect, Router } from "react-router-dom";
import { isAuth } from "./utils/auth";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import ListDistributor from "./pages/ListDistributor";
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
          <Route path="/distributor/list" exact>
            <Sidebar/>
            <ListDistributor/>

          </Route>
          
        </Switch>
    </>
  );
}

export default App;
