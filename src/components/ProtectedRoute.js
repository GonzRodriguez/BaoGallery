// import { logDOM } from "@testing-library/react";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import authentication from "./auth"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={(props) => (
                user.auth ? <Component {...props}/>
                : <Redirect to={{ pathname: "/login", state: { from: rest.location } }} />
            )}
        />
        );
    };
    
    export default ProtectedRoute
    