import React from 'react'
import { makeStyles, CardMedia, Grid, FormControlLabel, Checkbox, Card,  CardActions } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import DeletePostButton from "./DeletePostButton"
import CreatePostForm from "./CreatePostForm"


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "fit-content",
        paddingInline: "0.7rem  "
    }, 
    image: {
        flex: 0
    },
    

}));

export default function PreviewImages(props) {
    const classes = useStyles();
    const [previewImages, setPreviewImages, images] = props.handleImages
    
    const handleChange = (event, i) => {
        setPreviewImages(prevState => 
        prevState.map(image =>
                image.filename === i.filename ? { image: i.image, filename: i.filename, checked: !i.checked } : image
                )
            )
            
    };

    return (
        <Grid container spacing={2} justifycontent="center" >
         {previewImages.map(image => {
             return (
                 <Grid item key={previewImages.indexOf(image)} >
                  <Card variant="outlined">
                    <div className={classes.root} >
                        <CardActions>
                        <FormControlLabel
                            control={<Checkbox icon={<RadioButtonUncheckedIcon 
                            />
                            } 
                            checked={image.checked}
                            onClick={(event) => handleChange(event, image)}
                            checkedIcon={<RadioButtonCheckedIcon />}
                            name={image.filename} />}
                        />
                        <DeletePostButton handleImages={props.handleImages} image={image}/>
                         </CardActions>
                         {!image.checked && <CreatePostForm images={images} /> }
                        <CardMedia
                            component="img"
                            className={classes.image}
                            alt="image"
                            height="30rem"
                            image={image.image}
                        />
                      </div>
                  </Card>
                 </Grid>
             )
         })
        }
        </Grid>
    )
}
