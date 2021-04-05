import React, {useEffect} from "react";

import { InputLabel, InputAdornment, InputBase, Button, Grid, fade, Link, makeStyles, IconButton} from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CollectionsIcon from '@material-ui/icons/Collections';
import LabelIcon from '@material-ui/icons/Label';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) => ({
    inputLabel: {
        fontSize: 13,
        margin: "10px 0"
    },
    input: {
        borderRadius: "5px",
        padding: theme.spacing(1),
        fontSize: 16,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.15),
        },
    },

    iconButton: {
        maxWidth: "2rem",
        height: "1rem"
    },
    clearIcon: {
        maxWidth: "2vh"
    },
    tagsDisplay: {
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing(1)
    },
    formGroup:{
        marging: theme.spacing(2),
        width: "100%"
    },


}));

export default function CreatePostForm(props) {
    const classes = useStyles();

    const { collection, setCollection, price, setPrice, tags, setTags, tagInput, setTagInput} = props.imageData

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.length > 1) {
            setTags(prevTags => ({ required: false, value: prevTags.value.concat(tagInput.toLowerCase()) }))
            setTagInput("")
        }
        
    }

    
    const handleTags = () => {
        const filterTags = tags.value.filter(tag => tag === tagInput)
        
        if (filterTags.length > 0) {
            setTagInput("");
        } else if (tagInput < 1){
            setTagInput("")
        } else {
            setTags(prevTags => ({ required: false, value: prevTags.value.concat(tagInput.toLowerCase()) }))
            setTagInput("")
        }
    }

useEffect(() => {
    
}, [price, tags, tagInput])
    const tagsArray = tags.value.map(tag => {
        return (
            <Link href={tag} key={tags.value.indexOf(tag)}onClick={(e) => e.preventDefault()} variant="body2">
                {" #" + tag}
                <IconButton 
                    className={classes.iconButton} aria-label="delete" 
                    onClick={() => { setTags(prevTags => ({ required: prevTags.required, value: prevTags.value.filter(t => t !== tag) }))}} >
                    <ClearIcon className={classes.clearIcon}/>
                </IconButton>
            </Link>
        )
    })

    return (

            <form className={classes.formGroup}>
            <Grid container direction="row" spacing={2} alignItems="center" >
                <Grid item xs>

                    {price.required ? 
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
                    {tags.required ?
                        <InputLabel error shrink className={classes.inputLabel}>Add or delete tag to be submited </InputLabel>
                        :
                        <InputLabel shrink className={classes.inputLabel}>Tags</InputLabel>
                    }
                    <InputBase
                        error={tags.required}
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

            </Grid>
        </form>
    )
}
