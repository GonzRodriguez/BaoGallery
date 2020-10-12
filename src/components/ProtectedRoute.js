// import { logDOM } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Axios from "axios";

// passed compontent as props

const  ProtectedRoute = ({ component: Component, ...rest }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const authentication = async () => {
        Axios.get("http://localhost:3000/api/isAuth", { withCredentials: true })

            .then(response => {
                if (response.data === true) {
                    setIsAuthenticated(response.data)
                }//this.authenticated = response.data
            })
      }

    useEffect(() => {
        authentication()
    })

    return (
        <Route
            // passed the rest of the props to the route
            {...rest}
            render={props => {
                if (isAuthenticated) {
                    return <Component {...props} />;
                } if (isAuthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute