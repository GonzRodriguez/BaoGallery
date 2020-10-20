// import { logDOM } from "@testing-library/react";
import React from "react";
import { Route, Redirect } from "react-router-dom";
// import authentication from "./auth"

const ProtectedRoute = ({ component: Component, user: User, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) => (
                localStorage.getItem("tokens") ? <Component {...props} user={User.user}/>
                : <Redirect to={{ pathname: "/", state: { from: rest.location } }} />
            )}
        />
        );
    };
    
    export default ProtectedRoute
    