/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Container } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { ApiContext } from "../context/ApiContext"
import Posts from './Posts';
import ProfileCard from './Dashboard/ProfileCard';
import Spinner from './Action-Components/spinner';

const useStyles = makeStyles(() => ({
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
            const user = await api.getProfile(username).then(res => res.data)
            setProfile(user)
        })()
    }, [])
        
    return (
        !profile ?
        <Spinner/>
        :

            <Container className={classes.root}>
            <ProfileCard profile={profile}/>
                <Posts collection={"profile"} query={profile.username}/>
            </Container>
        )
}

export default Profile;