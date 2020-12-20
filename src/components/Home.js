import React, { useContext } from 'react';
import {UserContext} from "../context/UserContext"

function Home(props) {
    const user = useContext(UserContext)
    console.log(user.cookie);
    
    
    return (
        <div>
        <h1>El user {user && user.auth}</h1>
            <p>La Home</p>
        </div>
    );
}

export default Home;