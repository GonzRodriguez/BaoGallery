import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core'; 


const useStyles = makeStyles((theme, hovered) => ({
    iconButton: {
        position: "absolute",
        bottom: "1%",
        right: "1%",
        color: "white",
    },
    deleteIconStyle: hovered => { 
      return {
          opacity: hovered ? "100%" : "80%"
      }
    }

}));

export default function DeletePostButton(props) {
    const [hovered, setHovered] = useState(false)
    const classes = useStyles(hovered);
    const handleImageState = () => {
        props.previewImages.splice(props.previewImages.indexOf(props.image), 1);
        props.setPreviewImages([...props.previewImages]);
        props.images.splice(props.previewImages.indexOf(props.image), 1);
        props.setImages([...props.images]);
    }

    return (
        <IconButton className={classes.iconButton} aria-label="delete" onClick={() => { handleImageState() }}>
            <DeleteIcon
            onMouseOver={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)} 
            className={classes.deleteIconStyle}
            />
        </IconButton>
    )
}
