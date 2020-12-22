import React, { useEffect, useState, useContext } from "react"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Home from "./components/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import { Route, Switch } from "react-router-dom";
import Theme from "./components/Theme"
import {ThemeProvider} from '@material-ui/core/styles';
import Spinner from "./components/spinner" 
import { ApiContext } from "./context/ApiContext";
import { UserContext } from "./context/UserContext";



function  App() {
  const [user, setUser] = useState(null)
  const api = useContext(ApiContext)

  
  async function loadUserFromServer() {
    try {
      let response = await api.getUser().then(response => response.data)
      setUser(response)
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    loadUserFromServer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user === null) {
    return (
      <Spinner/>
    )
  }


  return (
    <div className="App">
        <UserContext.Provider value={user}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
            <Header />
              <Switch>
                <Route exact from="/" component={Home} />
                <Route exact from="/Home" component={Home} />
                <ProtectedRoute path="/dashboard"  component={Dashboard}/> 
                <Route exact path="/signup"  component={Signup} /> 
                <Route exact path="/login"  component={Login} />
                <Route exact path="/logout" />
                <Route path="*" component={() => "404 NOT FOUND"} />
              </Switch>
            <Footer/>
        </ThemeProvider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
