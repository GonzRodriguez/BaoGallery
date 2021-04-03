/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import { makeStyles, Grid, Container } from "@material-ui/core"
import Post from "./Post"
import Spinner from "./Action-Components/spinner" 
import { ApiContext } from "../context/ApiContext"
// import useInfiniteScroll from "./Action-Components/useInfiniteScroll"

const useStyles = makeStyles(() => ({
    root: {
        marginTop: "2vh",
        width: "100%",
        borderRadius: 0,
    }

}));


function Posts(props) {
    const classes = useStyles();
    const api = useContext(ApiContext) 
    const [posts, setPosts] = useState(Array.from(Array(10).values(), n => n + 1))
    // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMorePosts);
    
    // function fetchMorePosts() {
    //     // if (posts.length % 10 === 0){
    //         setTimeout(() => {
    //             setPosts(prevState => ([...prevState, ...Array.from(Array(10).values(), n => n + prevState.length + 1)]));
    //             setIsFetching(false);
    //         }, 2000);
    //     // }
    // }
    useEffect(() => {       
        
        (async () => {
            const res = await api.fetchPosts(props.collection, props.query).then(res => res.data)
            setPosts(prevPost => prevPost.concat(res))
        })()
    }, [])
    
    return (

        !posts ? 
            <Spinner /> 
        : (
            <Container>
                <Grid className={classes.root} container alignItems="stretch" spacing={3}>
                    {posts.map(post => {
                        if(post.creator){
                        return (
                            <Grid key={post._id} item xs={12} sm={6}>
                                <Post post={post} posts={posts} setPosts={setPosts} profile={props.query}/>
                            </Grid>
                        )
                                
                        } 
                        }) }
                    {/* {isFetching && <div style={{height: "20vh", display: "flex", alignItems: "center", width: "inherit"}}> <Spinner /> </div> } */}
                </Grid>
            </Container>
            )
        )
}

export default Posts;