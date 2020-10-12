import React from "react";
import  {withRouter}  from "react-router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery"; 
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem';
import { notAuthenticatedMenuItems, authenticatedMenuItems } from "./drawerMenuItems"
// import router from "../../server/api/logout";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    },
    headerOptions: {
        marginRight: "3vw",
        justifyContent: "space-evenly"
    },
    list: {
        width: 250,
    },
}));

const Header = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleButtonClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null)
    };

  

    return (
        <div className={classes.root}>
                   
            <AppBar position="static">
                <Toolbar>
                    <Typography color="initial"  onClick={() => handleButtonClick("/")} className={classes.title}>
                        <label style={{ fontFamily: "Bebas Neue", fontSize: "40px"}}>Bao Gallery</label>
                        </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer 
                                id="menu-appbar"
                                anchor={"right"}
                                keepMounted
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                <List style={{ display: props.auth ? 'none' : 'block' }} className={classes.list}>
                                    {notAuthenticatedMenuItems.map(menuItem => {
                                    const { key, menuTitle, pageURL} = menuItem;
                                    return (
                                        <MenuItem key={key} onClick={() => handleButtonClick(pageURL)}>
                                            <ListItem>{menuTitle}</ListItem>
                                        </MenuItem>
                                    );
                                })}
                                </List>
                                <List style={{ display: props.auth ? 'block' : 'none' }} className={classes.list}>
                                    {authenticatedMenuItems.map(menuItem => {
                                        const { key, menuTitle, pageURL, action } = menuItem;
                                        return (
                                            <MenuItem key={key} onClick={() => handleButtonClick(pageURL ? pageURL : action())}>
                                                <ListItem>{menuTitle}</ListItem>
                                            </MenuItem>
                                        );
                                    })}
                                </List>
                            </Drawer>
                        </>
                    ) : (
                            <div style={{ display:  props.auth ? 'none' : 'block'  }} className={classes.headerOptions}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleButtonClick("/signup")}
                                >
                                    SING UP
              </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => handleButtonClick("/login")}
                                >
                                    LOGIN
              </Button>
                            </div>
                        )}
                </Toolbar>
            </AppBar>
        </div>
    );
};
//  the header component can be wrapped in a withRouter function, 
// This gives the Header component access to this.props.history, which means the header can now redirect the user.:

export default withRouter(Header);
