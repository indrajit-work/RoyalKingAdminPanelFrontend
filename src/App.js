import { Route, Switch, Redirect, Router } from "react-router-dom";
import { isAuth } from "./utils/auth";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
      <Route path="/login" exact>
        <Login />
      </Route>
   
        <Switch>
         {/* {isAuth() && <Sidebar/>} */}
          <Route path="/" exact>
          <Redirect to="/dashboard" />
       
            
          </Route>
          <Route path="/dashboard" exact>
            <Sidebar></Sidebar>
            <Dashboard/>
           
          </Route>
        </Switch>
    </>
  );
}

export default App;
