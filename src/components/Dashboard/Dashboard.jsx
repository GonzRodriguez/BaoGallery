
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditProfileForm from "./EditProfileForm"
// import UploadImage from "./UplaodImage"
// import GetImage from "./GetImage"
import _ from "lodash"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "90%",
        borderRadius: 20,
        margin: "2vh auto"
    },
    icons: {
        color: "#000",
        fontSize: "2vh",
    },
    title:{
        fontFamily: "Abril Fatface",
        color: "primary"
    },

}));

export default function Dashboard() {
    const classes = useStyles();
    const user = useContext(UserContext)  
    const {instagram, facebook, snapchat, twitter, flickr} = user.data  
    const accounts = [
        { account: instagram, icon: "fab fa-instagram"},
        { account: facebook, icon: "fab fa-facebook"},
        { account: snapchat, icon: "fab fa-snapchat"},
        { account: twitter, icon: "fab fa-twitter"},
        { account: flickr, icon: "fab fa-flickr"}
]
      const accountList = accounts.map(account => {
           return( 
                <Typography key={account.icon} variant="body2">
                   <i className={account.account && account.icon}>&nbsp;</i>
                    <strong>{ _.upperFirst(account.account)}&nbsp;</strong>
                </Typography>
                
            )
        })


    return (
        <div>

            {/* ----------------------------------   Header  ----------------------------------- */}

        <Card variant="outlined" className={classes.root}>
            <Box display="flex" justifyContent="space-between">
                <Box mx={1} my={1}>
                    <CardHeader
                        // avatar={
                        //     <UserAvatar variant="rounded" ></UserAvatar>
                        // }
                        title={<Typography variant="h4" className={classes.title} color="textPrimary" >
                        {user.data.username}
                        </Typography>}
                            subheader={
                            <>
                            <i className="fas fa-at"></i> {user.data.email} 
                            {user.data.webpage && <span>  &nbsp; <i className="fas fa-user-circle"></i> {user.data.webpage}</span> }
                            </>
                            }
                        />
                </Box>
                    <Box mx={4} my={6}>
                        <EditProfileForm alert={alert} />
                    </Box>
            </Box>
        <Box style={{ width: '100%' }} >
            <Box display="flex" justifyContent="space-between">
                <Box mx={1} my={1}>
                    <CardActions >
                        {accountList && accountList}
                    </CardActions> 
                </Box>
            </Box>
        </Box>
        </Card>
            {/* ----------------------------------   Photos Section  ----------------------------------- */}
            {/* <GetImage /> */}
            {/* <UploadImage /> */}
        </div>
    );
}