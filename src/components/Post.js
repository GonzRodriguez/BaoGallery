import React, { useState, useContext } from 'react';
import { Card, Typography, Menu, makeStyles, CardMedia, IconButton, List, ListItem, MenuItem } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ApiContext } from "../context/ApiContext"
import { UserContext } from "../context/UserContext"


const useStyles = makeStyles((backgroundColor) => ({
    root: {
        maxHeight: "200vh",
        borderRadius: 0,
        position: "relative"
    },
    list: {
        margin: "2vh",
        padding: 0,
        
    },
    listitem: {
        padding: 0,
        margin: 0,
    },
     typo: {
        display: "inline-flex",
        fontFamily: 'Anton',
    },
    tag: {
        fontSize: "2vh",
        margin: "1px",
        color: "#959c97",
        padding: 0,
        borderRadius: 4,   
        maxWidth: "fit-content",
        textDecoration: "none"
    },
    optionsButton: {
        position: "absolute",
        top: "1px",
        right: "1px"
    },
    optionsIcon: {
        padding: 0,
        maxWidth: "fit-content",
        color: "antiquewhite"
    }

}));


function Post(props) {
    const preventDefault = (event) => event.preventDefault();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const api = useContext(ApiContext)
    const user = useContext(UserContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const postDeletion = () => {
        api.deletePost(props.post._id, user._id).then(res => console.log(res))
        props.posts.splice(props.posts.indexOf(props.post), 1)
        props.setPosts(props.posts.filter(post => post._id !== props.post._id))
        handleClose()
    }

    return (

        <Card className={classes.root}>
            <CardMedia
                component="img"
                alt="image"
                height="300vh"
                image={props.post.postsPath}
            />
            <IconButton className={classes.optionsButton} onClick={handleClick}>
                <MoreVertIcon className={classes.optionsIcon}/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={postDeletion}>Delete</MenuItem>

            </Menu>
            <List className={classes.list} >
                <ListItem className={classes.listitem}>
                    <Typography  className={classes.typo}> {props.post.price}$</Typography>
                </ListItem>
                <ListItem className={classes.listitem}>
                    <Typography style={{ display: "flex", color: "#959c97" }} >
                    {props.post.tags.map(tag => {
                        return <IconButton 
                        href="#" onClick={preventDefault}
                        key={props.post.tags.indexOf(tag)}
                        className={classes.tag} 
                        variant="caption">#{tag}&nbsp;</IconButton>
                    })}
                    </Typography>
                </ListItem>
            </List>
        </Card>
        )
}

export default Post;