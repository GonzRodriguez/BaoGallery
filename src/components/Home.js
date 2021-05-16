/* eslint-disable no-unused-expressions */
import React from "react";
import { makeStyles, useMediaQuery, Divider } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import Login from "./Auth/Login"
const useStyles = makeStyles((theme) => ({
    root: {
    },
    loginComponent: {
        width: "50%"
    },
    heroImg:{
        width: "40%",
        height: "80vmin"
    },
    heroLg: {
        width: "100%",
        paddingInline: "10rem",
        paddingTop: "3rem",
        position: "relative",
        display: "flex", 
        justifyContent: "space-between"
    },
     heroSm: {
        width: "100%",
        height: "70vh",
        position: "relative"
    },
 
    about: {
        width: "100vw",
        height: "fit-content",
        position: "relative",
        display: "flex",
        alignItems: "center"
    },
    aboutBg: {
        backgroundColor: "#efefefcc",
        position: "absolute",
        zIndex: -1,
        width: "100%",
        height: "100%",
        clipPath: "polygon( 0% 100%, 100% 100%, 100% 0%, 0% 10%)"
    },
    aboutDescription: {
        height: "fit-content",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        padding: "10%",
        flexWrap: "wrap"
    },
    aboutItemLg: {
        display: "flex",
        flexBasis: "30%",
        flexDirection: "column",
        minWidth: "30vh",
        margin: "1rem",
    }, 


}));

function Home() {
    // const user = useContext(UserContext)
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    

    return (
        <>
                { matches ? 
                <section className={classes.heroLg}>
                    <Login className={classes.loginComponent}/>
                    <Divider orientation="vertical" flexItem />
                    <div className={classes.heroImg}>
                        <img src="./084-photographer-monochrome.svg" alt="Hero" style={{ height: "80%", width: "100%"}}/>
                    </div>
                </section>
                :
                <section className={classes.heroSm}>
                    <Login />
                </section>
                }
            <section className={classes.about} >
                <div className={classes.aboutBg}/>
                <div className={classes.aboutDescription}>
                    <div className={classes.aboutItemLg} >
                        <p style={{ margin: "1.2rem", padding: ".2rem", fontFamily: "Saira Condensed", fontSize: "3.5vw", fontWeight: 300 }}>
                            A place to <strong>share</strong> the best of your street walks. 
                        </p>
                        <i className="fas fa-project-diagram" style={{ fontSize: "5rem", textAlign: "center" }}></i>
                    </div>
                    <div className={classes.aboutItemLg }>
                        <p style={{ margin: "1.2rem", padding: ".2rem", fontFamily: "Saira Condensed", fontSize: "3.5vw", fontWeight: 300 }}>
                            <strong>Get in touch</strong> with the people you find on the street when the pictures are ready. 
                        </p>
                        <i className="far fa-paper-plane" style={{ fontSize: "5rem", textAlign: "center" }}></i>
                    </div>
                    <div className={classes.aboutItemLg}>
                        <p style={{ margin: "1.2rem", padding: ".2rem", fontFamily: "Saira Condensed", fontSize: "3.5vw", fontWeight: 300 }}>
                            Open a door to freelancing world by <strong>selling your art</strong>. 
                        </p>
                        <i className="far fa-handshake" style={{ fontSize: "5rem", textAlign: "center" }}></i>
                    </div>
                    {/* <img src="" alt="home images" style={{ width: "30vw", height: "50vh", border: "solid 5px black", boxShadow: "-5px 5px 0px black", margin: "1.2rem" }}/> */}
                </div>
            </section>
        </>
    );
}

export default Home;