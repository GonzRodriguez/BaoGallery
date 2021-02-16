import React from "react";
import _ from "lodash"
import { Card, CardHeader, Typography, Avatar, makeStyles, Grid } from "@material-ui/core";
import EditProfileForm from "./EditProfileForm"
import Spinner from "../Action-Components/spinner"


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "1vh 0",
        border: theme.border.border,
        marginInline: "2rem"
    },
    icons: {
        fontSize: "2vh",
    },
    title: {
        fontFamily: theme.fontFamily.body,
        fontWeight: 600,
        color: "primary"
    },
    avatar: {
        width: "8rem",
        height: "8rem"
    },
    header: {
        marginInline: "3rem",
        marginBlock: "2rem",
        position: "relative"
    }


}));
function ProfileCard(props) {
    const classes = useStyles();

    const { instagram, facebook, snapchat, twitter, flickr } = props.profile
    console.log(props.profile);
    const accounts = [
        { account: instagram, icon: "fab fa-instagram" },
        { account: facebook, icon: "fab fa-facebook" },
        { account: snapchat, icon: "fab fa-snapchat" },
        { account: twitter, icon: "fab fa-twitter" },
        { account: flickr, icon: "fab fa-flickr" }
    ]
    // const accountList = accounts.map(account => {
    //     return (
    //         <Grid item key={account.icon} >
    //             <Typography  variant="body1">
    //                 {account.account.length > 0 && <i className={account.icon}>&nbsp;</i>}
    //                 {_.upperFirst(account.account)}
    //             </Typography>
    //         </Grid>

    //     )
    // })  
    return (
        !props.profile ?
            <Spinner />
            :
        <Card variant="outlined" className={classes.root}>
            <header className={classes.header} >
                <Grid container spacing={2} >
                        <Grid item xs={12} sm={2} >
                            <Avatar alt="Avatar" src={props.profile.avatar} className={classes.avatar} />
                        </Grid>
                    <Grid item xs={10}  >
                        <CardHeader
                            title={<Typography className={classes.title} variant="h2" color="textPrimary" > {props.profile.username} </Typography>}
                            subheader={<> <i className="fas fa-at"></i> {props.profile.email} {props.profile.webpage && <span> &nbsp; <i className="fas fa-props.profile-circle"></i> {props.profile.webpage}</span>} </>}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} direction="row" >

                    {accounts.map(account => {
                        return (
                            <Grid item key={account.icon} >
                                <Typography variant="body1">
                                    {account.account.length > 0 && <i className={account.icon}>&nbsp;</i>}
                                    {_.upperFirst(account.account)}
                                </Typography>
                            </Grid>

                        )
                    })}
                    {/* {accountList && accountList} */}
                </Grid>
                <EditProfileForm alert={alert} />
            </header>
        </Card>
    )
}

export default ProfileCard
