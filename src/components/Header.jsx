import React, { useContext, useState } from "react";
import  {withRouter}  from "react-router";
import { makeStyles, useMediaQuery, AppBar, Toolbar, Typography, Button, useTheme} from "@material-ui/core";
import { IsAuthContext } from "../context/IsAuthContext";
import RightDrawer from "./Drawer/Drawer"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontFamily: "Righteous",
        fontSize: "4vh",
        fontWeight: "bold"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "solid 5px black"
    },
    headerOptions: {
        marginRight: "3vw",
        justifyContent: "space-evenly"
    },
    list: {
        width: 250,
    }, 
    actionUpButton: {
        backgroundColor: "#e9e9e9",
        height: "2.5rem",
        width: "7rem",
        margin: "10px",
        boxShadow: "-5px 5px 0px black",
        border: "solid 5px black",
        cursor: "pointer",
        borderRadius: 0,
    }
}));

const Header = props => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [anchorEl, setAnchorEl] = useState(false);
    const authContext = useContext(IsAuthContext)

    function handleDrawer() {
        !anchorEl ? setAnchorEl(true) : setAnchorEl(false);
    }

    return (
                   
            <AppBar  position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title} onClick={() => { window.location = "/" }}> BAO GALLERY </Typography>
                        {matches ?
                            <div className={classes.loginButtons}>

                                <Button mx={2} py={2} style={{ height: "2.5rem", borderRadius: 0 }} onClick={() => { window.location = "/login" }}>LogIn</Button>
                                <Button className={classes.actionUpButton} onClick={() => { window.location = "/signup" }}> SignUp </Button>
                            </div>
                            :
                            <RightDrawer anchor={anchorEl} onClick={() => { handleDrawer() }} />
                        }
                </Toolbar>
            </AppBar>
    );
};
//  the header component can be wrapped in a withRouter function, 
// This gives the Header component access to this.props.history, which means the header can now redirect the user.:

export default withRouter(Header);
