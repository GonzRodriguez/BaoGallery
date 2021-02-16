/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import { makeStyles, Grid, Container } from "@material-ui/core"
import { useParams } from "react-router-dom"
import Post from "./Post"
import { UserContext } from "../context/UserContext"
import Spinner from "./Action-Components/spinner" 
import { ApiContext } from "../context/ApiContext"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "2vh",
        width: "fullWidth",
        borderRadius: 0,
    }

}));


function Posts(props) {
    const classes = useStyles();
    const api = useContext(ApiContext) 
    const [posts, setPosts] = useState([])
        
    posts.map((post) => {
        console.log(post);
    })
    useEffect(() => {       
        
        (async () => {
            const res = await api.fetchPosts(props.profile.username).then(res => res.data)
            setPosts(prevPost => prevPost.concat(res))
            
        })()
    }, [])
    

    return (

        !posts ? <Spinner /> : (
            <Container>
                <Grid className={classes.root} container alignItems="stretch" spacing={3}>
                    {posts.map(post => {
                        return (
                            <Grid key={post._id} item xs={12} sm={6}>
                                <Post post={post} posts={posts} setPosts={setPosts}/>
                            </Grid>
                        )
                                
                        }) }
                </Grid>
            </Container>
            )
        )
}

export default Posts;