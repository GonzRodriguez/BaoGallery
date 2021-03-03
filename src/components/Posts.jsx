/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import { makeStyles, Grid, Container } from "@material-ui/core"
import Post from "./Post"
import Spinner from "./Action-Components/spinner" 
import { ApiContext } from "../context/ApiContext"

const useStyles = makeStyles(() => ({
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

    useEffect(() => {       

        (async () => {
            const res = await api.fetchPosts(props.collection, props.query).then(res => res.data)
            setPosts(prevPost => prevPost.concat(res))
            console.log(res);
        })()
    }, [])
    
    return (

        !posts ? <Spinner /> : (
            <Container>
                <Grid className={classes.root} container alignItems="stretch" spacing={3}>
                    {posts.map(post => {
                        return (
                            <Grid key={post._id} item xs={12} sm={6}>
                                <Post post={post} posts={posts} setPosts={setPosts} profile={props.query}/>
                            </Grid>
                        )
                                
                        }) }
                </Grid>
            </Container>
            )
        )
}

export default Posts;