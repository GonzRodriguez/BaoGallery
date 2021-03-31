import React, { useCallback, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, Typography, Button, Grid  } from '@material-ui/core';
import PreviewImages from "./PreviewImages"
import CreatePostForm from "./CreatePostForm"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    dropzone: {
        height: "40%",
        display: "flex",
        margin: "20px 0",
        padding: "1.5rem",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        widht: "100%",
        border: theme.border.border,
        borderStyle: "dashed",
        '&:hover': {
            border: "5px dashed #b9b9b9"
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
    const [previewImages, setPreviewImages, images, setImages] = props.handleImages
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            // remove duplicated images
            reader.onloadstart = () => { previewImages.forEach(element => { return file.name === element.filename && previewImages.splice(previewImages.indexOf(element), 1) }) }
            // add preview images
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPreviewImages(prevImages => prevImages.concat({image: reader.result, filename: file.name, checked: true}))
                    setImages(prevImages => prevImages.concat(file))
                }
            }
            reader.readAsDataURL(file)
        })
        
    }, [previewImages, setPreviewImages, setImages])
    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true  })
    
useEffect(() => {
    console.log(images);
})


         return (
             <>
                {previewImages.length > 0 && 
                <CreatePostForm handleImages={props.handleImages}/>
                }
                 <div {...getRootProps()} className={classes.dropzone}>
                    <input {...getInputProps()} />
                    {!previewImages.length > 0 ?
                    <>
                    <CloudUploadIcon style={{ fontSize: 90 }} />
                    <Typography variant="button"> Drag & Drop Your Images Here </Typography>
                    <Button variant="contained">
                        <label htmlFor="file-upload" > 
                            Or Select your files
                        </label>
                    </Button>
                    <input type="file" name="input" id="file-upload" multiple {...getInputProps()} hidden/>
                     </>
                     :
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                      
                        <Button variant="contained" fullWidth>
                            <label htmlFor="file-upload" > 
                                Select Files
                            </label>
                        </Button>
                        <input type="file" name="input" id="file-upload" multiple {...getInputProps()} hidden/>
                        </Grid>
                        <Grid item xs={12}>
                        <PreviewImages 
                        handleImages={props.handleImages}
                        />
                        </Grid>
                    </Grid>
                    }
                 </div>
            </>
        // }
                )

}