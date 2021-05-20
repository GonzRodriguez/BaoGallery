import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext";
import Logout from "../Auth/logout"
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import SearchInput from "../Action-Components/SearchInput";
import List from '@material-ui/core/List';
import { useMediaQuery, useTheme } from "@material-ui/core";
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
    searchInput: {
        position: 'relative',
        borderRadius: "5px",
        paddingInline: ".5rem",
        backgroundColor: theme.palette.grey[200],
        '&:hover': {
            backgroundColor: theme.palette.grey[300],
        },
        marginTop: theme.spacing(2),
        marginInline: theme.spacing(2),
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }
}));

export default function RightDrawer(props){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
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
        <IconButton edge="start" className={classes.menuButton}  aria-label="menu" onClick={handleMenu} >
            <MenuIcon />
        </IconButton>
        <Drawer id="menu-appbar" anchor={"right"} keepMounted open={open} onClose={() => setAnchorEl(null)} >   
                {!matches && <SearchInput styleName={classes.searchInput} />}
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