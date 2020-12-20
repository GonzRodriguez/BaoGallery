import React, { useContext } from "react";
import  {withRouter}  from "react-router";
import { makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { UserContext } from "../context/UserContext";
import RightDrawer from "./Drawer/Drawer"

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

const Header = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useContext(UserContext)

    const handleButtonClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null)
    };

    return (
        <div className={classes.root}>
                   
            <AppBar style={{backgroundColor: "#fff"}} position="static">
                <Toolbar  >
                    <Typography  onClick={() => handleButtonClick("/")} className={classes.title}>
                        <label  style={{fontFamily: "Bebas Neue", fontSize: "40px"}}>Bao Gallery</label>
                        </Typography>
                    {/* {isMobile ? ( */}
                        <>
                        <div style={{ display: user.auth ? 'none' : 'block' }} className={classes.headerOptions}>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => handleButtonClick("/signup")}
                            >
                                SING UP
              </Button>
                            <Button
                                color="secondary"
                                onClick={() => handleButtonClick("/login")}
                            >
                                LOGIN
              </Button>
                        </div>
                        <RightDrawer anchor={anchorEl}/>
                        </>
                </Toolbar>
            </AppBar>
        </div>
    );
};
//  the header component can be wrapped in a withRouter function, 
// This gives the Header component access to this.props.history, which means the header can now redirect the user.:

export default withRouter(Header);
