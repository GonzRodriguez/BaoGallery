/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import { makeStyles, Grid, Container } from "@material-ui/core"
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


function Posts() {
    const classes = useStyles();
    const user = useContext(UserContext)
    const api = useContext(ApiContext) 
    const [posts, setPosts] = useState([])
    
    async function fetchPosts(){
        await user.posts.map(async postId => {
            const res = await api.fetchPost(postId).then(res => res.data)
            setPosts(prevPost => prevPost.concat(res))
        })
    }
    
    useEffect(() => {        
        fetchPosts()
    }, [])


    return (

        !posts.length ? <Spinner /> : (
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