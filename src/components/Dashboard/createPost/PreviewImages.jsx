import React from 'react'
import { makeStyles, CardMedia, Grid, Card } from '@material-ui/core';
import DeletePostButton from "./DeletePostButton"

const useStyles = makeStyles(() => ({
    image: {
        position: "relative",
        display: "flex",
    }
}));

export default function PreviewImages(props) {
    const classes = useStyles();
    return (
        
        <Grid container alignItems="stretch" spacing={1}>
         {props.previewImages.map(image => {
             return (
                 <Grid className={classes.image} key={props.previewImages.indexOf(image)} item xs={12} sm={6}>
                        <CardMedia
                            component="img"
                            alt="image"
                            height="140vh"
                            image={image.image}
                        />
                        <DeletePostButton images={props.images} image={image} setImages={props.setImages} previewImages={props.previewImages} setPreviewImages={props.setPreviewImages} />
                 </Grid>
             )
         })
        }
        </Grid>
    )
}
