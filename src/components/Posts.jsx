/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import { makeStyles, Grid, Container, InputBase, Button, ButtonGroup } from "@material-ui/core"
import Post from "./Post"
import Spinner from "./Action-Components/spinner" 
import { ApiContext } from "../context/ApiContext"
import Error404 from './Error404';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "2vh",
        width: "100%",
        borderRadius: 0,
    },
    input: {
        backgroundColor: theme.palette.grey[200],
        margin: "1rem 1rem 1rem 0",
        borderRadius: "5px",
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },

}));


function Posts(props) {
    const classes = useStyles();
    const api = useContext(ApiContext) 
    const {collection, query} = props
    const [posts, setPosts] = useState([])
    const [filtering, setFiltering] = useState(false)
    const [filteredPosts, setFilteredPosts] = useState([])
    const [tags, setTags] = useState([])
    const [coll, setCollection] = useState([])
    const [date, setDate] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const getPosts = async () => {
        const res = await api.fetchPosts(collection, query).then(res => res.data)
        setPosts(prevPost => prevPost.concat(res))
        setIsloading(false)
    }
    const changeDateFormat = (date) => {
        let day
        let month
        date.slice(8).startsWith(0) ? day = date.slice(9, 11) : day = date.slice(8, 11) 
         date.slice(5).startsWith(0)? month = date.slice(6, 7) : month = date.slice(5, 7) 
        const newFormat = day + "-" + month + "-" + date.slice(0, 4)
        setDate(newFormat)
    }
    const filter = () =>{
        setFiltering(true)
        setFilteredPosts(prevPosts => prevPosts.concat(
            posts.filter(post => post.imgCollection === coll)
            ))
        setFilteredPosts(prevPosts => prevPosts.concat(
            posts.map(post => post.tags.includes(tags) && post)
        ))
        setFilteredPosts(prevPosts => prevPosts.concat(
            posts.filter(post => post.createdAt === date)
        ))
    }
    const clear = () => {
        setFiltering(false)
        setFilteredPosts([])
        setTags([])
        setCollection([])
        setDate([])
    }
    useEffect(() => {       
        let mounted = true
        try {
            if(mounted) {
                getPosts()
                return () => mounted = false;
            }
        } catch (error) {
            console.log(error);
        }   
    }, [])
    
    return (
    <>
    {isLoading ? 
    <Spinner /> 
    : 
    posts.length > 0 ? 
    <form style={{display: "flex", flexWrap: "wrap", margin: "1rem", alignItems: "center", justifyContent: "center"}}>
        <InputBase
            className={classes.input}
            placeholder="collection"
            value={coll}
            onChange={(e) => setCollection(e.target.value) }
        />
        <InputBase
            className={classes.input}
            placeholder="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
        />
        <InputBase
            className={classes.input}
            placeholder="Search…"
            type="date"
            onChange={(e) => changeDateFormat(e.target.value) }
        />
        <ButtonGroup variant="outlined" style={{ height: "-webkit-fill-available" }} color="secondary" aria-label="contained primary button group">
        <Button
        size="large"
        onClick={filter}
        >
            Filter
        </Button>
        <Button
        size="small"
        onClick={clear}
        >
            clear
        </Button>
        </ButtonGroup>
    </form>
    :
    <Error404/>
    }
    {isLoading ? 
    <Spinner /> 
    : 
    !filtering ? 
    (<Container>
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
            </Grid>
        </Container>
    )
    :
    (<Container>
            <Grid className={classes.root} container alignItems="stretch" spacing={3}>
                {filteredPosts.map(post => {
                    if(post.creator){
                        return (
                            <Grid key={post._id} item xs={12} sm={6}>
                                <Post post={post} posts={posts} setPosts={setPosts} profile={props.query}/>
                            </Grid>
                        )
                    } 
                }) }
            </Grid>
        </Container>
    )
    }
    </>
    )
}

export default Posts;