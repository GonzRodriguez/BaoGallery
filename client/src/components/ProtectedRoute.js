// import { logDOM } from "@testing-library/react";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { IsAuthContext } from "../context/IsAuthContext";
import Spinner from "./Action-Components/spinner" 

const ProtectedRoute =  ( { component: Component, ...rest }) => {
    const authContext = useContext(IsAuthContext)

    return (
        <Route
            {...rest}
            render={props => (
                !authContext.isLoading ?
                    (
                        authContext.auth ?
                            <Component {...props} />
                            :
                            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                    )
                    :
                    <Spinner />
            )}
            />
        );
    };
    
    export default ProtectedRoute
    