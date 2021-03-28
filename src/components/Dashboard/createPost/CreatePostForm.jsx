import React, { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { UserContext } from "../../../context/UserContext";
import _ from "lodash"
import { InputLabel, InputAdornment, InputBase, Button, Grid, fade, Link, makeStyles, IconButton } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CollectionsIcon from '@material-ui/icons/Collections';
import LabelIcon from '@material-ui/icons/Label';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) => ({
    inputLabel: {
        fontSize: 13,
        margin: "10px 0"
    },
    input: {
        spacing: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: "5px",
        height: "2.5rem",
        fontSize: 16,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.15),
        },
    },
    button: {
        height: "2.5rem",
    },
    iconButton: {
        maxWidth: "2vh",
        height: "1vh"
    },
    clearIcon: {
        maxWidth: "2vh"
    },
    tagsDisplay: {
        display: "flex",
        margin: "10px 0",
    },
    formGroup:{
        // backgroundColor: theme.palette.primary.light,
        border: theme.border.border,
        padding: theme.spacing(3),
        marging: theme.spacing(2),
        width: "100%"
    },


}));

export default function CreatePostForm(props) {
    const classes = useStyles();
    const user = useContext(UserContext)
    const api = useContext(ApiContext)
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    const [collection, setCollection] = useState("");
    const [price, setPrice] = useState({required: false, value: ""});
    const { username, _id } = user

    const date = () => {

        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        return day + "-" + month + "-" + year
    }

    let post = { creatorId: _id, creator: username, createdAt: date(), date: new Date(), price: price.value, tags: tags, imgCollection: collection}
    const uploadImage = () => 
        !price.value ? setPrice({ required: true }) : 
    props.images.forEach(image => {
        const fd = new FormData()
        fd.append("creator", username)
        fd.append("collection", collection)
        fd.append("image", image)

        api.uploadImage(fd).then(res => console.log("uploaded image", res))
        post.title = image.name
        
        api.createPost(post).then(res => console.log("created post", res))
    });

    
    // const handleUpload = () => {
    //     !price.value ?  setPrice({ required: true }) : uploadImage()
        
    // }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.length > 1) {
            setTags(prevTags => prevTags.concat(_.lowerCase(tagInput)))
            setTagInput("")
        }
        
    }

    
    const handleTags = () => {
        const filterTags = tags.filter(tag => tag === tagInput)
        
        if (filterTags.length > 0) {
            setTagInput("");
        } else if (tagInput < 1){
            setTagInput("")
        } else {
            setTags(prevTags => prevTags.concat(_.lowerCase(tagInput)))
            setTagInput("")
        }
    }

    
    const tagsArray = tags.map(tag => {
        return (
            <Link href={tag} key={tags.indexOf(tag)} onClick={(e) => e.preventDefault()} variant="body2">
                {" #" + tag}
                <IconButton 
                    className={classes.iconButton} aria-label="delete" 
                    onClick={() => { tags.splice(tags.indexOf(tag), 1); setTags([...tags]);}} >
                    <ClearIcon className={classes.clearIcon}/>
                </IconButton>
            </Link>
        )
    })

    return (

            <form className={classes.formGroup}>
            <Grid container direction="row" spacing={2} alignItems="center" >
                <Grid item xs>
                    { price.required === true ? 
                    <InputLabel error shrink className={classes.inputLabel}>This field is required</InputLabel> 
                    :
                    <InputLabel shrink className={classes.inputLabel}>Choose a price</InputLabel>
                    }
                    <InputBase
                        error={price.required}
                        id="Price*"
                        margin="none" 
                        className={classes.input}
                        fullWidth
                        type="number"
                        onChange={(e) => setPrice({ required: false, value: e.target.value })}
                        startAdornment={<InputAdornment position="start"> <MonetizationOnIcon /> </InputAdornment> }
                    />  
                </Grid>
                <Grid item xs>
                    <InputLabel shrink className={classes.inputLabel}>Tags</InputLabel>
                    <InputBase
                        id="Tags"
                        className={classes.input}
                        margin="none"
                        fullWidth
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        startAdornment={ <InputAdornment position="start"> <LabelIcon /> </InputAdornment> }
                        endAdornment={ <Button onClick={handleTags} > ADD </Button> }
                    />
                </Grid>   
                <Grid item xs>
                    <InputLabel shrink className={classes.inputLabel}>Collection</InputLabel>
                    <InputBase
                        id="Collection"
                        margin="none"
                        fullWidth
                        className={classes.input}
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                        onKeyDown={handleKeyDown}
                        startAdornment={<InputAdornment position="start"> <CollectionsIcon /> </InputAdornment>}
                    />
                </Grid>               
            </Grid>
            <Grid>
            {tagsArray && 
            <Grid item className={classes.tagsDisplay} >
                {tagsArray}
            </Grid>
            }
                <Grid container direction="row" justify="flex-end">
                <Button
                    size="large"
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={uploadImage}
                >
                    Upload
                </Button>
            </Grid>
            </Grid>
        </form>
    )
}
