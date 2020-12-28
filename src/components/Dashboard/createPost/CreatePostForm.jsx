import React, { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { UserContext } from "../../../context/UserContext";
import _ from "lodash"

import { InputLabel, InputAdornment, Input, Button, Grid, Link,  makeStyles } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LabelIcon from '@material-ui/icons/Label';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() => ({
    inputLabel: {
        fontSize: 13 
    },
    iconButton: {
        maxWidth: "2vh",
        height: "1vh"
    },
    clearIcon: {
        maxWidth: "2vh"
    },
    paper: {
        maxWidth: "fit-content",
        paddingLeft: "1vh"
    },
    tagsDisplay: {
        display: "flex"
    }

}));

export default function CreatePostForm(props) {
    const [tags, setTags] = useState([]);
    const classes = useStyles();
    const [inputValue, setInputValue] = useState("");
    const [price, setPrice] = useState({required: false, value: ""});
    const user = useContext(UserContext)
    const api = useContext(ApiContext)
    const { username, _id } = user.data

    const date = () => {

        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        return day + "-" + month + "-" + year
    }
    
    const handleUpload = () => {
        const upload = () => 
        console.log(props.previewImages);
        props.previewImages.forEach(image => {
            const fd = new FormData()
            fd.append("creatorId", _id)
            fd.append("creator", username)
            fd.append("createdAt", date())
            fd.append("date", new Date())
            fd.append("price", price.value)
            fd.append("tags", tags)
            fd.append("title", image.name)
            fd.append(image.name, image)

            api.createPost(fd).then(res => console.log(res))
        });

        if (!price.value) { setPrice({required: true}) }
        else { upload() }
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
                <IconButton className={classes.iconButton} aria-label="delete" onClick={() => { tags.splice(tags.indexOf(tag), 1); setTags([...tags]);}} >
                    <ClearIcon className={classes.clearIcon}/>
                </IconButton>
            </Link>
        )
    })


    return (
        <form>
            <Grid item >
                
                {!price.required ?
                <div>
                <InputLabel className={classes.inputLabel}>Choose a price</InputLabel>
                <Input
                    id="Price*"
                    fullWidth
                    required
                    placeholder="5$"
                    type="number"
                    onChange={(e) => setPrice({ required: false, value: e.target.value})}
                    startAdornment={ <InputAdornment position="start"> <MonetizationOnIcon /> </InputAdornment> }
                />
                </div>
                :
                <div>
                <InputLabel error className={classes.inputLabel}>This field is required</InputLabel>
                <Input
                    error
                    id="Price*"
                    fullWidth
                    required
                    placeholder="5$"
                    type="number"
                    onChange={(e) => setPrice({ required: false, value: e.target.value })}
                    startAdornment={<InputAdornment position="start"> <MonetizationOnIcon /> </InputAdornment> }
                />  
                </div>
                }
                
            </Grid>
            <br />
            <Grid item>
                <InputLabel className={classes.inputLabel}>Tags</InputLabel>
                <Input
                    fullWidth
                    id="Tags"
                    value={inputValue}
                    placeholder="Red dress..."
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    startAdornment={ <InputAdornment position="start"> <LabelIcon /> </InputAdornment> }
                    endAdornment={ <Button onClick={handleTags} > ADD </Button> }
                />
            </Grid>
            <br />
            <Grid item className={classes.tagsDisplay} >
                    {tagsArray && tagsArray}
            </Grid>
            <br />
            <Grid item>
                <Button
                    variant="contained"
                    color="default"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </Grid>
        </form>
    )
}
