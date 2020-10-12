import React, { useEffect, useState } from "react";
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
import Axios from "axios";


function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const authentication = async () => {
      Axios.get("http://localhost:3000/api/isAuth", { withCredentials: true })

        .then(response => {
          console.log(response.data);
          if (response.data === true) {
            setIsAuthenticated(response.data)
          }//this.authenticated = response.data
        })
    }

    useEffect(() => {
      authentication()
    })
  return (
    <div className="App">
    {/* in order to use a personalized materlial-ui theme we need to wrap the app in a ThemeProvider */}
      <ThemeProvider theme={Theme}>
      <Header auth={isAuthenticated}/>
      <Switch>
        <Route exact from="/" component={Home} />
        <Route exact from="/Home" component={Home} />
        <ProtectedRoute isAuthenticated exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/logout" /> */}
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
      <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
