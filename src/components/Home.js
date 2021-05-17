/* eslint-disable no-unused-expressions */
import React from "react";
import { makeStyles, useMediaQuery, Divider, Grid, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
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
    about: {
        width: "100vw",
        height: "fit-content",
        position: "relative",
        display: "flex",
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
        display: "flex",
        padding: "10%",
    },
    card: {
        marginBlock: "20px"
    }

}));

function Home() {
    // const user = useContext(UserContext)
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    

    return (
        <>
                { matches ? 
                <section className={classes.heroLg}>
                    <Login className={classes.loginComponent}/>
                    <Divider orientation="vertical" flexItem />
                    <div className={classes.heroImg}>
                        <img src="./084-photographer-monochrome.svg" alt="Hero" style={{ height: "80%",  minWidht: "400px", margin: "2rem"}}/>
                    </div>
                </section>
                :
                <section className={classes.heroSm}>
                    <Login />
                </section>
                }
            <section className={classes.about} >
                <div className={classes.aboutBg}/>
                    <Grid container spacing={1} className={classes.aboutDescription}>
                        <Grid item xs={12} sm={6}>
                            <Grid item>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        image="https://i.gyazo.com/e4ed5a0cd9b0084dc558e3b3f1850c3e.png"
                                        title="Authenticated Users"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            User Authentication
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Create diferent profiles using JWT refresh and access token.
                                            All the users get stored in MongoDB atlas
                                        </Typography>

                                    </CardContent>
                                </Card>                        
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        image="https://i.gyazo.com/12bfee8dc9e7cdfdacf12fa5f8e75b74.png"
                                        title="search bar"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Search Bar
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Search users, tags & collections with the powered by MongoDB Atlas search bar.
                                        </Typography>

                                    </CardContent>
                                </Card>
                                
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid item>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        image="https://i.gyazo.com/6445f4bfc1cba22fd5dfbca5b1c7bd57.png"
                                        title="upload images"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Upload Images
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Drag and drop or select feature in order to upload the images to the node.js server.
                                        </Typography>

                                    </CardContent>
                                </Card>
                            <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        image="https://i.gyazo.com/5f6d3189e031d243a995d5ac3e3169ba.png"
                                        title="filter images"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Filter Images
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Find images in the dashboard by tag, date or collection
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Grid>
                        </Grid>
                    </Grid>
            </section>
        </>
    );
}

export default Home;