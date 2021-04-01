import React, { useState } from 'react'
import { makeStyles, CardMedia, Grid, FormControlLabel, Checkbox, Card, CardActions, InputLabel, fade, InputBase, IconButton, Link, Typography, Popover, Button, InputAdornment } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import DeleteIcon from '@material-ui/icons/Delete';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CollectionsIcon from '@material-ui/icons/Collections';
import LabelIcon from '@material-ui/icons/Label';
import ClearIcon from '@material-ui/icons/Clear';



const useStyles = makeStyles((theme) => ({
    cardActions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "fit-content",
        paddingInline: "0.7rem  "
    }, popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        boxShadow: 0,
    },
    image: {
        flex: 0,
        marginInlineStart: "1rem"
    },
    inputLabel: {
        fontSize: 13,
        margin: theme.spacing(1),
    },
    input: {
        borderRadius: "5px",
        minWidth: "10rem",
        padding: theme.spacing(1),
        margin: theme.spacing(1),
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
    formGroup: {
        display: "flex", 
        flexWrap: "wrap",
        marging: theme.spacing(2),
        width: "100%"
    },

}));

export default function PreviewImages(props) {
    const classes = useStyles();
    const [images, setImages] = props.handleImages
    const [tagInput, setTagInput] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleCheckBox = (event, i) => {
        setImages(prevState =>
            prevState.map(image =>
                image.filename === i.filename ? { ...image, checked: !i.checked } : image
            ))
    };
    const handleCollection = (event, i) => {
        event.persist()
        console.log(event.target.value);
        setImages(prevState =>
            prevState.map(image =>
                image.filename === i.filename ? { ...image, imgCollection: event.target.value } : image
            ))
    };
    const handlePrice = (event, i) => {
        event.persist()
        setImages(prevState =>
            prevState.map(image =>
                image.filename === i.filename ? { ...image, price: { required: false, value: event.target.value } } : image
            ))
    };
    const handleKeyDown = (e, i) => {
        if (e.key === 'Enter' && tagInput.length > 1) {
            setImages(prevState =>
                prevState.map(image =>
                    image.filename === i.filename ? { ...image, tags: image.tags.concat(tagInput.toLowerCase()) } : image
                ))
            setTagInput("")
        }

    }
    const handleTags = (i) => {
        const filterTags = i.tags.filter(tag => tag === tagInput)

        if (filterTags.length > 0) {
            setTagInput("");
        } else if (tagInput < 1) {
            setTagInput("")
        } else {
            setImages(prevState =>
                prevState.map(image =>
                    image.filename === i.filename ? { ...image, tags: image.tags.concat(tagInput.toLowerCase()) } : image
                ))
            setTagInput("")
        }
    }
    const handleDelete = (image) => {
        setImages(images.filter(i => i.filename !== image.filename));
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Grid container spacing={2} justifycontent="center" >
         {images.map(image => {
             return (
                 <Grid item key={images.indexOf(image)} >
                  <Card variant="outlined">
                    <div className={classes.cardActions} >
                        <CardActions>
                        <FormControlLabel
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            control={
                            <Checkbox 
                            icon={<RadioButtonUncheckedIcon />
                            } 
                            checked={image.checked}
                            onClick={(event) => handleCheckBox(event, image)}
                            checkedIcon={<RadioButtonCheckedIcon />}
                            name={image.filename} />}
                        />  
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                                paper: classes.paper,
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus>
                        <Typography variant="body2">Change this photography details</Typography>
                        </Popover>
                        <IconButton className={classes.iconButton} aria-label="delete" onClick={() => { handleDelete(image) }}>
                            <DeleteIcon />
                        </IconButton>
                         </CardActions>

                        <CardMedia
                            component="img"
                            className={classes.image}
                            alt="image"
                            height="30rem"
                            image={image.previewImage}
                        />
                      </div>
                     <Grid item >
                     {!image.checked &&
                         <form >
                            <Grid container direction="row" spacing={2} alignItems="center" className={classes.formGroup}>
                                <Grid item xs>
                                    {image.price.required ?
                                        <InputLabel error shrink className={classes.inputLabel}>This field is required</InputLabel>
                                        :
                                        <InputLabel shrink className={classes.inputLabel}>Choose a price</InputLabel>
                                    }
                                    <InputBase
                                        error={image.price.required}
                                        id="Price*"
                                        margin="none"
                                        className={classes.input}
                                        fullWidth
                                        type="number"
                                        onChange={(e) => handlePrice(e, image)}
                                        startAdornment={<InputAdornment position="start"> <MonetizationOnIcon /> </InputAdornment>}
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
                                        onKeyDown={(e) => handleKeyDown(e, image)}
                                        startAdornment={<InputAdornment position="start"> <LabelIcon /> </InputAdornment>}
                                        endAdornment={<Button onClick={() => handleTags(image)} > ADD </Button>}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <InputLabel shrink className={classes.inputLabel}>Collection</InputLabel>
                                    <InputBase
                                        id="Collection"
                                        margin="none"
                                        fullWidth
                                        className={classes.input}
                                        value={image?.imgCollection}
                                        onChange={(e) => handleCollection(e, image)}
                                        onKeyDown={handleKeyDown}
                                        startAdornment={<InputAdornment position="start"> <CollectionsIcon /> </InputAdornment>}
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid item className={classes.tagsDisplay} >
                                    {image.tags.map(tag => {
                                        return (
                                            <Link href={tag} key={image.tags.indexOf(tag)} onClick={(e) => e.preventDefault()} variant="body1" style={{ color: "#8a8a8a"}}>
                                                {" #" + tag}
                                                <IconButton
                                                    className={classes.iconButton} aria-label="delete"
                                                    onClick={() => {
                                                        setImages(prevState =>
                                                            prevState.map(i =>
                                                                i.filename === image.filename ? { ...i, tags: i.tags.filter(t => t !== tag) } : i
                                                            ))
                                                    }} >
                                                    <ClearIcon className={classes.clearIcon} />
                                                </IconButton>
                                            </Link>
                                        )
                                    })}
                                </Grid>
                             </Grid>
                         </form>}
                     </Grid>
                     </Card>
                 </Grid>
                 
             )
         })
        }
        </Grid>
    )
}
