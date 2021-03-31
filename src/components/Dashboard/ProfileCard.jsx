import React, { useEffect, useContext } from "react";
import _ from "lodash"
import { Card, CardHeader, Typography, Avatar, makeStyles, Grid } from "@material-ui/core"
import { UserContext } from "../../context/UserContext"
import EditProfileForm from "./EditProfileForm"

const useStyles = makeStyles((theme) => ({
    root: {
        border: theme.border.border,
        height: "fit-content",
        padding: "1rem",
    },
    icons: {
        fontSize: "2vh",
    },
    title: {
        fontFamily: theme.fontFamily.body,
        fontWeight: 600,
        color: "primary"
    }
}));
function ProfileCard(props) {
    const classes = useStyles();
    const user = useContext(UserContext)
    const {_id, ...accounts}  = props.profile.socialMediaAccounts


    useEffect(() => {
        console.log(user._id === props.profile._id );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={<Avatar alt="Avatar" src={props.profile.avatar}  />}
                title={<Typography className={classes.title} variant="h2" color="textPrimary" > {props.profile.username} </Typography>}
                subheader={<> <i className="fas fa-at"></i> {props.profile.email} {props.profile.webpage && <span> &nbsp; <i className="fas fa-props.profile-circle"></i> {props.profile.webpage}</span>} </>}
                action={user._id === props.profile._id && <EditProfileForm alert={alert} />}
            />
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
        </Card>
    )
}

export default ProfileCard
