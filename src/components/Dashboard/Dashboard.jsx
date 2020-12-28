
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditProfileForm from "./EditProfileForm"
import Avatar from '@material-ui/core/Avatar';
import CreatPost from "./createPost/CreatePost"
// import GetImage from "./GetImage"
import _ from "lodash"
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "0",
        margin: "1vh 0",
        backgroundColor: theme.palette.primary.light
    },
    icons: {
        fontSize: "2vh",
    },
    title:{
        fontFamily: "Abril Fatface",
        color: "primary"
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
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
                    {account.account.length > 1 && <i className={account.icon}>&nbsp;</i> }
                    { _.upperFirst(account.account)}
                </Typography>
                
            )
        })

    return (
        <div>

            {/* ----------------------------------   Header  ----------------------------------- */}

        <Card variant="outlined" className={classes.root}>
            <Container maxWidth="sm">
            <Box display="flex" justifyContent="space-between">
                <Box mx={1} my={1}>
                    <CardHeader
                        avatar={ <Avatar alt="Avatar" src={user.data.avatar} className={classes.large} /> }
                        title={<Typography variant="h4" className={classes.title} color="textPrimary" > {user.data.username} </Typography>}
                        subheader={ <> <i className="fas fa-at"></i> {user.data.email} {user.data.webpage && <span> &nbsp; <i className="fas fa-user-circle"></i> {user.data.webpage}</span> } </> }
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
            </Container>
        </Card>
            {/* ----------------------------------   Photos Section  ----------------------------------- */}
            {/* <GetImage />  */}
            <CreatPost />
            <img src="200-536x354 - copia.jpg" alt=""/>
        </div>
    );
}