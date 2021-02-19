import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext";
import Logout from "../Auth/logout"
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import { notAuthenticatedMenuItems, authenticatedMenuItems } from "./drawerMenuItems"


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        color: "#074A49",
    },
    headerOptions: {
        marginRight: "3vw",
        justifyContent: "space-evenly"
    },
    list: {
        width: 250,
    },
}));

export default function RightDrawer(props){

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(props.anchorEl);
    const user = useContext(UserContext)

    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleButtonClick = pageURL => {
        window.location = pageURL
        setAnchorEl(null)
    };
    return (
 <div>
        <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" onClick={handleMenu} >
            <MenuIcon />
        </IconButton>
        <Drawer id="menu-appbar" anchor={"right"} keepMounted open={open} onClose={() => setAnchorEl(null)} >   
                <List style={{ display: !user ? 'block' : 'none' }} className={classes.list}>
                    {notAuthenticatedMenuItems.map(menuItem => {
                        const { key, menuTitle, pageURL } = menuItem;
                        return (
                            <MenuItem key={key} onClick={() => handleButtonClick(pageURL)}>
                                <div>{menuTitle}</div>
                            </MenuItem>
                        );
                    })}
                </List>
                <List style={{ display: user ? 'block' : 'none' }} className={classes.list}>
                    {authenticatedMenuItems.map(menuItem => {
                        
                        const { key, menuTitle, pageURL } = menuItem;
                        return (
                            <MenuItem key={key} onClick={() => handleButtonClick(pageURL)}>
                                <div>{menuTitle}</div>
                            </MenuItem>
                        );
                    })}
                    <Logout />
                </List>
            </Drawer>
        </div>
        )
    }