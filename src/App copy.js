
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import useAuthContext from "./hooks/useAuthContext";



function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div>
{authIsReady && (
        <Router>
          <Nav />
      
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to='/login'/>}
              {user && <Home />}
            </Route>

            <Route path="/login">
              {user && <Redirect to='/'/>}
              {!user && <Login />}
            </Route>

            <Route path="/signup">
            {user && <Redirect to='/'/>}
              {!user && <Signup />}
            </Route>
          </Switch>
        </Router>
      )}

    </div>
  );
}

export default App;
