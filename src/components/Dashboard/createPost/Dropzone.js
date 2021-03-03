import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, Typography, Grid, Button  } from '@material-ui/core';
import PreviewImages from "./PreviewImages"
import CreatePostForm from "./CreatePostForm"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme, opacity) => ({
    dropzone: {
        height: "30vh",
        display: "flex",
        margin: "20px 0",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        widht: "100%",
        border: theme.border.border,
        borderStyle: "dashed",
        '&:hover': {
            opacity: "30%"
        }
    },

    previewImages: {
        margin: "2rem"
    }, 
    form: {
        border: theme.border.border,
        margin: "40px",
        borderRadius: "4px",
        backgroundColor: "#dddddd",
    }


}));

export default function Dropzone(props) {
    
    const classes = useStyles();
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
             <>
                    <div {...getRootProps()}  className={classes.dropzone}>
                               <input {...getInputProps()} />
                                    <CloudUploadIcon style={{ fontSize: 90 }}/>
                                     <Typography variant="button"> Drag & Drop Your Images Here </Typography>
                                     <Button variant="contained"> Or Select your file </Button>
                             </div>
                 {props.previewImages.length > 0 && <CreatePostForm  images={props.images} previewImages={props.previewImages} />}
                        <Grid item xs className={classes.previewImages}>
                                 <PreviewImages images={props.images} setImages={props.setImages} previewImages={props.previewImages} setPreviewImages={props.setPreviewImages} />
                         </Grid>
            </>
        // }
                )

}