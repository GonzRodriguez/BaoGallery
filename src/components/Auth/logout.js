import React, { useContext } from "react";
import { List, Divider, MenuItem} from '@material-ui/core'; 
import { ApiContext } from "../../context/ApiContext";
import { UserContext } from "../../context/UserContext";

    function Logout() {
        const api = useContext(ApiContext)
        const user = useContext(UserContext)


     const handleLogout = async () => {
        try {
            const response = api.logout({userId: user._id}).then(res => res)
            console.log(response);
            localStorage.clear()
            window.location = "/login"
        } catch (error) {
            console.log(error);
        } 
        }

        return (
            <List>
                <Divider/>
                <MenuItem onClick={() => handleLogout()} > <div>Logout</div> </MenuItem>
            </List>
        )
    }


export default Logout;
