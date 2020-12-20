import React, { useContext } from "react";
import { ApiContext } from "../../context/ApiContext"
import List from '@material-ui/core/List'; 
import MenuItem from "@material-ui/core/MenuItem";
import Divider from '@material-ui/core/Divider';

    function Logout() {
        const api = useContext(ApiContext)
        
     const handleLogout = async () => {

        const res = await api.logout().then(response => {return response.data })
            .then(localStorage.clear())
            .then(window.location = "/dashboard")   
            console.log(res);
        }

        return (
            <List>
                <Divider/>
                <MenuItem onClick={() => handleLogout()} > <div>Logout</div> </MenuItem>
            </List>
        )
    }


export default Logout;
