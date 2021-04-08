import React, { useContext } from "react";
import _ from "lodash"
import { Card, CardHeader, Typography, Avatar, makeStyles, Grid, Divider } from "@material-ui/core"
import { UserContext } from "../../context/UserContext"
import EditProfileForm from "./EditProfileForm"

const useStyles = makeStyles((theme) => ({
    root: {
        border: theme.border.border,
        height: "fit-content",
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

    return (

        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={<Avatar alt="Avatar" src={props.profile.avatar}  />}
                title={<Typography className={classes.title} variant="h2" color="textPrimary" > {props.profile.username} </Typography>}
                subheader={<> {props.profile.bio}  </>}
                action={user?._id === props.profile._id && <EditProfileForm alert={alert} />}
            />
            <Typography variant="body2" style={{ marginInline: "1rem" }}><span>{props.profile.email}</span></Typography>
            <Typography variant="body2" style={{ marginInline: "1rem" }}><span>{props.profile.webpage && props.profile.webpage}</span></Typography>
            <Divider/>
            <div style={{display: "flex", flexWrap: "wrap", margin: "1rem"}} >
            {Object.entries(accounts).map(account => {
                return (
                account[1] &&
                    <Grid item key={account[0]} >
                        <Typography variant="body1" style={{ marginInline: ".3rem" }}>
                            {<i className={`fab fa-${account[0]}`}>&nbsp;</i>}
                            {_.upperFirst(account[1])}
                        </Typography>
                    </Grid>
                )
            })}
            </div>                
        </Card>
    )
}

export default ProfileCard
