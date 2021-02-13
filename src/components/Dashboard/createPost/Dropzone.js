import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, Box, Typography, Grid, CardContent, Container, Collapse  } from '@material-ui/core';
import PreviewImages from "./PreviewImages"
import CreatePostForm from "./CreatePostForm"

const useStyles = makeStyles((theme, opacity) => ({
    dropzoneWithoutImages: {
        height: "20vh",
        display: "flex",
        margin: "0px 20px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b2a63",
        backgroundImage: "url(ps-neutral.png)",
        borderRadius: "5px",
        position: "relative",
        widht: "100%"

    },
    dropzoneWithImages: {
        height: "20vh",
    },
    componentWithImages: {
        backgroundColor: "#1b2a63",
        backgroundImage: "url(ps-neutral.png)",
        borderRadius: "5px",
        margin: "0px 20px",
        widht: "100%",
    },
    dropzoneRowElements: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",

    },
    innerBoxDropzone:  {
        backgroundColor: "#0c192e",
        borderRadius: "4px",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        color: "white",            
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

    const handleDropzone = () => {
        if (!props.previewImages.length) {
            return (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                <Box className={classes.dropzoneWithoutImages} >
                <Box 
                onMouseOver={() => setOpacity(true)}
                onMouseLeave={() => setOpacity(false)}
                className={`${classes.innerBoxDropzone} ${classes.onMouseOver}`}
                >
                    <Typography variant="button"> Select or Drop Your Images Here</Typography>
                </Box>
                </Box>
                </div>

                )
        }
         return (
             <Container>
                 <Grid className={classes.componentWithImages} >
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
                        <Grid className={classes.dropzoneRowElements} >
                        <Grid item xs={12} sm={8}  className={classes.previewImages}>
                             <CardContent>
                                 <PreviewImages images={props.images} setImages={props.setImages} previewImages={props.previewImages} setPreviewImages={props.setPreviewImages} />
                             </CardContent>
                         </Grid>
                         <Grid item xs={12} sm={4} className={classes.form}>
                             <CardContent>
                                <CreatePostForm images={props.images} previewImages={props.previewImages} />
                             </CardContent>
                            </Grid>
                        </Grid>
                </Grid>
            </Container>
        // }
                )
    }


    return (
        <div>
            {handleDropzone()}
        </div>
    )
}