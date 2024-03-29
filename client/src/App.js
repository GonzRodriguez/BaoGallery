import React, { useEffect, useState } from "react"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import isAuthUser from "./components/Auth/isAuth"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Home from "./components/Home"
import Profile from "./components/Profile"
import About from "./components/About"
import Collection from "./components/Collection"
import ProtectedRoute from "./components/ProtectedRoute"
import { Route, Switch } from "react-router-dom";
import Theme from "./components/Theme"
import {ThemeProvider} from '@material-ui/core/styles';
import { UserContext } from "./context/UserContext";
import { IsAuthContext } from "./context/IsAuthContext";
import Error404 from "./components/Error404"
import Spinner from "./components/Action-Components/spinner" 

function  App() {
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  async function IsAuthUser(){
    const isAuthenticated = await isAuthUser()
    const { auth, user, isLoading } = isAuthenticated
    setAuth(auth);
    setUser(user);
    setIsLoading(isLoading)
  }
 
  function refreshesToken() {
    setInterval(() => IsAuthUser(), 1000 * 60 * 10 )
  } 
  useEffect(() => {
    refreshesToken()    
    IsAuthUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
   if (auth && isLoading) { return (<Spinner />) }


  return (
    <div className="App">
        <ThemeProvider theme={Theme}>
        <UserContext.Provider value={user}>
          <IsAuthContext.Provider value={{auth, isLoading}}>
          <CssBaseline />
            <Header />
              <Switch>
                <Route exact from="/home" component={Home} />
                <Route exact from="/" component={Home} />
                <Route exact from="/about" component={About} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard}/> 
                <Route exact path="/signup" component={Signup} /> 
                <Route exact path="/login" component={Login} />
                <Route path="/profile/:username" children={<Profile />} />
                <Route path="/:collection/:query" children={<Collection />} />
                <Route exact path="/logout" />
                <Route path="*" component={Error404} />
              </Switch>
            <Footer/>
          </IsAuthContext.Provider>
        </UserContext.Provider>
        </ThemeProvider>
    </div>
  );
}

export default App;
