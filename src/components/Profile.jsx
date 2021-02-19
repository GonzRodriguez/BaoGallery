/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Container } from "@material-ui/core"
import { useParams } from "react-router-dom"
// import { UserContext } from "../context/UserContext"
import { ApiContext } from "../context/ApiContext"
import Posts from './Posts';
import ProfileCard from './Dashboard/ProfileCard';
import Spinner from './Action-Components/spinner';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "2vh",
        width: "fullWidth",
        borderRadius: 0,
    }

}));


function Profile() {
    const classes = useStyles();
    const api = useContext(ApiContext)
    const [profile, setProfile] = useState()
    const { username } = useParams();


    useEffect(() => {
        (async () => {
            const user = await api.getUser(username).then(res => res.data)
            setProfile(user)
        })()
    }, [])
        
    return (
        !profile ?
        <Spinner/>
        :

            <Container className={classes.root}>
            <ProfileCard profile={profile}/>
                <Posts profile={profile}/>
            </Container>
        )
}

export default Profile;