import React, { useEffect, useState } from "react"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import { Route, Switch } from "react-router-dom";
import Theme from "./components/Theme"
import {ThemeProvider} from '@material-ui/core/styles';
import Spinner from "./components/spinner" 
import getUser from "./components/getUser"
// import Axios from "axios";



function  App() {

  const [user, setUser] = useState(null)
  
  useEffect(() => {
  getUser((res) => {setUser(res)}) 
    }, [])

  if (user === null) {
    return (
      <Spinner/>
    )
  }

  return (
    <div className="App">
    {/* in order to use a personalized materlial-ui theme we need to wrap the app in a ThemeProvider */}
      <ThemeProvider theme={Theme}>
        <CssBaseline />
      <Header user={user}/>
      <Switch>
        <Route exact from="/" component={Home} />
        <Route exact from="/Home" component={Home} />
        <ProtectedRoute path="/dashboard" user={user} component={Dashboard}/>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        {/*   */}
        {/* <Route exact path="/logout" /> */}
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
      <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
