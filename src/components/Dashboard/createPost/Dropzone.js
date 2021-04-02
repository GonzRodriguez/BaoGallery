import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ApiContext } from "../../../context/ApiContext";
import { UserContext } from "../../../context/UserContext";
import { useDropzone } from 'react-dropzone'
import { makeStyles, Typography, Button, Grid, FormControlLabel, Checkbox, Fade   } from '@material-ui/core';
import PreviewImages from "./PreviewImages"
import CreatePostForm from "./CreatePostForm"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ArchiveIcon from '@material-ui/icons/Archive';

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
    },
    button: {
        height: "2.5rem",
        width: "20rem"
    },

}));

export default function Dropzone(props) {
    const classes = useStyles();
    const user = useContext(UserContext)
    const api = useContext(ApiContext)
    // const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([])
    const [collection, setCollection] = useState("");
    const [price, setPrice] = useState({ required: false, value: "" });
    const [tags, setTags] = useState([]);

    const imageData = [collection, setCollection, price, setPrice, tags, setTags]

    const date = () => {

        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        return day + "-" + month + "-" + year
    }
    const { username, _id } = user

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            // remove duplicated images
            reader.onloadstart = () => { images.forEach(element => { return file.name === element.filename && images.splice(images.indexOf(element), 1) }) }
            // add preview images
            reader.onload = () => {
                if (reader.readyState === 2) {
                    // setPreviewImages(prevImages => prevImages.concat({image: reader.result, filename: file.name, checked: true}))
                    setImages(prevImages => prevImages.concat({
                            previewImage: reader.result,
                            image: file, 
                            filename: file.name,
                            checked: true, 
                            creatorId: _id, 
                            creator: username, 
                            createdAt: date(), 
                            date: new Date(), 
                            price: { required: false, value: "" }, 
                            tags: [], 
                            imgCollection: ""
                        })
                    )
                }
            }
            reader.readAsDataURL(file)
        })
        
    }, [images, setImages, _id, username])
    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true  })

    const handleCheckBox = () => {
        images(prevState =>
            prevState.map(image =>
                image.checked === false ? { image: image.image, filename: image.filename, checked: true } : image
            )
        )
    };

    useEffect(() => {
            console.log(images)
    }, [images])
    
    const handleImages = [ images, setImages]

    const uploadImage = () =>
            images.forEach(image => {
                if ( !image.checked ){
                    api.uploadImage(image).then(res => console.log("uploaded image", res))
                    api.createPost(image).then(res => console.log("created post", res))
                }
                    // setImages(prevImage =>
                    //     prevImage.map(i => {
                    //         i.checked ? {...i, price: price, tags: tags, collection: collection} : i
                    //     })
                    // )
                }
            );

         return (
             <>
                {images.length > 0 && 
                <>
                    {!images.every(el => el.checked) &&
                    <div style={{display: "flex", alignItems: "center"} }>
                    <Fade in={!images.every(el => el.checked)}>
                        <FormControlLabel
                            control={<Checkbox icon={<RadioButtonUncheckedIcon />}
                            checked={images.every(el => el.checked)}
                            onChange={handleCheckBox}
                            checkedIcon={<RadioButtonCheckedIcon />}
                            />}
                        />
                    </Fade>
                    <Typography variant="body2"> Select All</Typography>
                    </div>
                    }
                     <CreatePostForm handleImages={props.handleImages} imageData={imageData} />
                     <Grid container direction="row" justify="center">
                         <Button
                             type="submit"
                             className={classes.button}
                             variant="contained"
                             startIcon={<CloudUploadIcon />}
                            //  onClick={uploadImage}
                         >
                             Upload
                </Button>
                     </Grid>
                </>
                }
                 <div {...getRootProps()} className={classes.dropzone}>
                    <input {...getInputProps()} />
                    {!images.length > 0 ?
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

                        <Button variant="outlined" fullWidth startIcon={<ArchiveIcon/>}>
                            <label htmlFor="file-upload" > 
                                Select Files
                            </label>
                        </Button>
                        <input type="file" name="input" id="file-upload" multiple {...getInputProps()} hidden/>
                        </Grid>
                        <Grid item xs={12}>
                        <PreviewImages 
                        handleImages={handleImages}
                        imageData={imageData}
                        />
                        </Grid>
                    </Grid>
                    }
                 </div>
            </>
        // }
                )

}