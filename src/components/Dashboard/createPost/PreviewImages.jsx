import React from 'react'
import { makeStyles, CardMedia, Grid  } from '@material-ui/core';
import DeletePostButton from "./DeletePostButton"

const useStyles = makeStyles(() => ({
    image: {
        position: "relative",
        display: "flex",
        height: "fit-content"
    }
}));

export default function PreviewImages(props) {
    const classes = useStyles();
    return (
        
        props.previewImages.map(image => {
        return (
            <Grid key={props.previewImages.indexOf(image)} className={classes.image} item xs={12} sm={3}>
                <CardMedia
                    component="img"
                    alt="image"
                    height="140vh"
                    image={image}
                />
                <DeletePostButton images={props.images} setImages={props.setImages} previewImages={props.previewImages} setPreviewImages={props.setPreviewImages} />
            </Grid>
        )
        })
    )

}
