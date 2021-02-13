
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext"
import { Card, CardHeader, CardActions, Typography, Avatar,  makeStyles  } from "@material-ui/core";
import EditProfileForm from "./EditProfileForm"
import Dropzone from "./createPost/Dropzone"
import Posts from "../Posts"
import Spinner from "../Action-Components/spinner" 
import _ from "lodash"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "1vh 0",
        border: theme.border.border,
        marginInline: "2rem"
    },
    icons: {
        fontSize: "2vh",
    },
    title:{
        fontFamily: theme.fontFamily.body,
        fontWeight: 600,
        color: "primary"
    },
    header: {
        display: "flex",
        marginInline: "3rem",
        marginBlock: "2rem",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerItems: {
        display: "flex",
        flexDirection: "column"
    },
    avatar: {
        minWidth: "10vw",
        minHeight: "10vw",
    }

}));

export default function Dashboard() {
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([])
    const classes = useStyles();
    const user = useContext(UserContext)  
    if (user == null) { return ( <Spinner /> ) }
    const {instagram, facebook, snapchat, twitter, flickr} = user
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
            <header className={classes.header} >
                <div className={classes.headerItems} >
                    <CardHeader
                        avatar={ <Avatar alt="Avatar" src={user.avatar} className={classes.avatar} /> }
                        title={<Typography className={classes.title} variant={"h2"} color="textPrimary" > {user.username} </Typography>}
                        subheader={ <> <i className="fas fa-at"></i> {user.email} {user.webpage && <span> &nbsp; <i className="fas fa-user-circle"></i> {user.webpage}</span> } </> }
                    />
                        <CardActions >
                            {accountList && accountList}
                        </CardActions> 
                </div>
                    <EditProfileForm alert={alert} />
            </header>
        </Card>
            {/* ----------------------------------   Photos Section  ----------------------------------- */}
            <Dropzone images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages} />
            <Posts /> 
            {/* <img src="/uploads/money/posts/imageProfile.jpg" alt=""/> */}
        </div>
    );
}