import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, Box, Typography, Grid, Container  } from '@material-ui/core';
import PreviewImages from "./PreviewImages"
import CreatePostForm from "./CreatePostForm"

const useStyles = makeStyles((theme, opacity) => ({
    dropzoneWithoutImages: {
        height: "20vh",
        display: "flex",
        margin: "0px 20px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.primary,
        backgroundImage: "url(ps-neutral.png)",
        position: "relative",
        widht: "100%",
        border: theme.border.border,
    },
    dropzoneWithImages: {
        height: "20vh",
    },
    dropzoneRowElements: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",

    },
    innerBoxDropzone:  {
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "4px",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        color: "black",            
    },
    innerBoxDropzoneWithImages: {
        height: "20vh",
        backgroundColor: "#0c192e",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        color: "white", 
    },
    previewImages: {
    }, 
    form: {
        border: theme.border.border,
        margin: "9px",
        borderRadius: "4px",
        backgroundColor: "#dddddd",
    },
    onMouseOver: opacity => {
        return {
            opacity: opacity ? "30%" : "60%"
            }
    },


}));

export default function Dropzone(props) {
    
    const [opacity, setOpacity] = useState(false)
    const classes = useStyles(opacity);
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            // remove duplicated images
            reader.onloadstart = () => { props.previewImages.forEach(element => { return file.name === element.filename && props.previewImages.splice(props.previewImages.indexOf(file), 1) }) }
            // add preview images
            reader.onload = () => {
                if (reader.readyState === 2) {
                    props.setPreviewImages(prevImages => prevImages.concat({image: reader.result, filename: file.name}))
                    props.setImages(prevImages => prevImages.concat(file))
                }
            }
            reader.readAsDataURL(file)
        })
        
    }, [props])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


         return (
             <Container>
                     <Box className={classes.dropzoneWithImages} >
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                 <Box
                                     onMouseOver={() => setOpacity(true)}
                                     onMouseLeave={() => setOpacity(false)}
                                     className={`${classes.innerBoxDropzoneWithImages} ${classes.onMouseOver}`}
                                 >
                                     <Typography variant="button"> Drop Your Images Here </Typography>
                                 </Box>
                             </div>
                        </Box>
                        {props.previewImages.length > 0 && <CreatePostForm images={props.images} previewImages={props.previewImages} />}
                        <Grid item xs className={classes.previewImages}>
                                 <PreviewImages images={props.images} setImages={props.setImages} previewImages={props.previewImages} setPreviewImages={props.setPreviewImages} />
                         </Grid>
            </Container>
        // }
                )

}