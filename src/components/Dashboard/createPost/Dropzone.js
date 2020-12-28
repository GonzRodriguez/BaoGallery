import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, Box, Typography } from '@material-ui/core';
import PreviewImages from "./PreviewImages"


const useStyles = makeStyles((theme, opacity) => ({
    root: {
        height: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b2a63",
        backgroundImage: "url(ps-neutral.png)",
        borderRadius: "25px",
        position: "relative"
    },
    innerBox:  {
        position: "absolute",
        backgroundColor: "#0c192e",
        borderRadius: "19px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "98%",
        height: "88%",
        color: "white",            
    },
    onMouseOver: opacity => {
        return {
            opacity: opacity ? "30%" : "60%"
            
            }
    },
    previewImages: {
        all: "revert",
        position: "absolute"
    }

}));

export default function Dropzone(props) {
    const [opacity, setOpacity] = useState(false)
    const classes = useStyles(opacity);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                if (reader.readyState === 2) {
                    props.setPreviewImages(prevImages => prevImages.concat(reader.result))
                    props.setImages(prevImages => prevImages.concat(file))
                }

            }
            reader.readAsDataURL(file)
        })

    }, [props])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box className={classes.root}>
                <Box 
                onMouseOver={() => setOpacity(true)}
                onMouseLeave={() => setOpacity(false)}
                className={`${classes.innerBox} ${classes.onMouseOver}`}
                >
                    <Typography variant="button"> Drop Your Images </Typography>
                {/* {props.previewImages && <Typography variant="button"> Drop Your Images </Typography> }
                <PreviewImages className={classes.previewImages} images={props.images} setImages={props.setImages} previewImages={props.previewImages} setPreviewImages={props.setPreviewImages} /> */}
                </Box>
            </Box>
        </div>
    )
}