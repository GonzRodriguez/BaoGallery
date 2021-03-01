import React, { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { UserContext } from "../../../context/UserContext";
import _ from "lodash"
import { InputLabel, InputAdornment, FilledInput , Button, Grid, Link, makeStyles, IconButton, FormGroup } from '@material-ui/core';
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
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState([]);
    const [collection, setCollection] = useState();
    const [price, setPrice] = useState({required: "", value: ""});
    const { username, _id } = user

    const date = () => {

        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        return day + "-" + month + "-" + year
    }

    let post = { creatorId: _id, creator: username, createdAt: date(), date: new Date(), price: price.value, tags: tags, imgCollection: collection}
    const uploadImage = () => 
    props.images.forEach(image => {
        const fd = new FormData()
        fd.append("creator", username)
        fd.append("collection", collection)
        fd.append("image", image)

        api.uploadImage(fd).then(res => console.log("uploaded image", res))
        post.title = image.name
        
        api.createPost(post).then(res => console.log("created post", res))
    });

    
    const handleUpload = () => {
        !price.value ?  setPrice({ required: true }) : uploadImage()
    }

    const handleKeyDown = (e) => {
        const filterTags = tags.filter(tag => tag === inputValue)

        if (filterTags.length > 0) {
            setInputValue("");
        } else if (inputValue < 1) {
            setInputValue("")
        } else if (e.key === 'Enter') {
            setTags(prevTags => prevTags.concat(_.lowerCase(inputValue)))
            setInputValue("")
        }
        
    }

    
    const handleTags = () => {
        const filterTags = tags.filter(tag => tag === inputValue)
        
        if (filterTags.length > 0) {
            setInputValue("");
        } else if (inputValue < 1){
            setInputValue("")
        } else {
            setTags(prevTags => prevTags.concat(_.lowerCase(inputValue)))
            setInputValue("")
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

            <FormGroup className={classes.formGroup}>
            <Grid container direction="row" spacing={2} alignItems="center" justify>
                <Grid item xs>
                    { price.required === true ? 
                    <InputLabel error className={classes.inputLabel}>This field is required</InputLabel> 
                    :
                    <InputLabel className={classes.inputLabel}>Choose a price</InputLabel>
                    }
                    <FilledInput 
                        error={price.required}
                        id="Price*"
                        fullWidth
                        type="number"
                        onChange={(e) => setPrice({ required: false, value: e.target.value })}
                        startAdornment={<InputAdornment position="start"> <MonetizationOnIcon /> </InputAdornment> }
                    />  
                </Grid>
                <Grid item xs>
                    <InputLabel className={classes.inputLabel}>Tags</InputLabel>
                    <FilledInput 
                        id="Tags"
                        fullWidth
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        startAdornment={ <InputAdornment position="start"> <LabelIcon /> </InputAdornment> }
                        endAdornment={ <Button onClick={handleTags} > ADD </Button> }
                    />
                </Grid>   
                <Grid item xs>
                    <InputLabel className={classes.inputLabel}>Collection</InputLabel>
                    <FilledInput
                        id="Colection"
                        fullWidth
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
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </Grid>
            </Grid>
        </FormGroup>
    )
}
