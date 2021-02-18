import React, { useEffect, useContext, useState } from "react";
import _ from "lodash"
import { Card, CardHeader, Typography, Avatar, makeStyles, Grid } from "@material-ui/core"
import { UserContext } from "../../context/UserContext"
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
    const user = useContext(UserContext)
    const {_id, ...accounts}  = props.profile.socialMediaAccounts
    // const displayAccounts = () => {
    //     for (const [key, value] of Object.entries(accounts)) {
    //         return (
    //             <Grid item key={key} >
    //                 <Typography variant="body1">
    //                     {<i className={`fab fa-${key}`}>&nbsp;</i>}
    //                     {_.upperFirst(value)}
    //                 </Typography>
    //             </Grid>

    //         )}
    // }
    Object.entries(accounts).map(account => {
        return console.log(account);

    })
    useEffect(() => {
    }, [])

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
                        {Object.entries(accounts).map(account => {
                            return (
                            account[1] &&
                                <Grid item key={account[0]} >
                                    <Typography variant="body1">
                                        {<i className={`fab fa-${account[0]}`}>&nbsp;</i>}
                                        {_.upperFirst(account[1])}
                                    </Typography>
                                </Grid>
                            )
                        })}
                </Grid>
                {user === props.profile && <EditProfileForm alert={alert} />}
            </header>
        </Card>
    )
}

export default ProfileCard
