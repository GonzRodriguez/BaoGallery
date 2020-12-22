import React, { useState, useContext } from "react";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LabelIcon from '@material-ui/icons/Label';
import { ApiContext } from "../../context/ApiContext";
import { UserContext } from "../../context/UserContext";
import { InputLabel, InputAdornment, Input, makeStyles, Card, FormControl, CardActionArea, CardActions, Fab, CardMedia, CardContent, Button, Box, Grid, Container, } from '@material-ui/core';
// import FileBase from 'react-file-base64'
// import Axios from "axios"

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      borderRadius: "0"
    },
    img: {
      borderRadius: "8px",
      maxWidth: "140vh",
      cursor: "pointer",
    },
    margin: {
    margin: theme.spacing(1),
    },
    card: {
      position: "relative",
    },
    input: {
      margin: 0,

    }

}));

export default function CreatePost(props) {
  // const [image, setImage] = useState({ preview0: "", raw0: "", });
  const [images, setImages] = useState([]);
  // preview1: "", raw1: "", preview2: "", raw2: "", preview3: "", raw3: "",
  const user = useContext(UserContext)
  const api = useContext(ApiContext)
  const classes = useStyles();
  const arrayOfImages = []
  class Image { constructor(base64Data){ this.base64Data = base64Data }
 }
  const handleChange = async e => {
       await Array.from(e.target.files).forEach(file => { 
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          if (reader.readyState === 2) {
            const image = new Image(reader.result)
            arrayOfImages.push(image)
            setImages(prevImages => prevImages.concat(reader.result))
            return arrayOfImages
          }
        }
      })
    }
    // handleUpload();
  const {username, _id} = user.data

  const handleUpload = async e => {


    const post = {
      creator: username,
      creatorId: _id,
      image: images,
      created: new Date().getDay(),
      // price: price,
      // tags: tags
    }
    
    api.createPost(post)
  }

  const cardCustom = images.map(image => {
    return (
        <Grid item xs={10} sm={3}>
          <CardActions>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="image"
                height="180vh"
                image={image}
              />
            </CardActionArea>
          </CardActions>
        </Grid>

    )
  })

 
  return (
    <Container maxWidth="200vh">
        {/* <FormControl id="uploadImage" > */}
      <Box flexGrow={1} display="flex">
          <Grid container justify="center" spacing={3} xs={12} >
                {cardCustom}
          </Grid>
            {images.length > 1 && 
          <CardContent>
          <Card >
          <Box display="flex" justifyContent="center" m={2} p={1}>
              {/* <FormControl> */}
              <Grid>
                <Grid item>
                  <InputLabel style={{ fontSize: 13 }}>Choose a price</InputLabel>
                  <Input
                    id="Price"
                    placeholder="5$"
                    margin="none"
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">
                        <MonetizationOnIcon />
                      </InputAdornment>
                    }
                  />
                </Grid>
                <br />
                <Grid item>
                  <InputLabel style={{fontSize: 13}}>Tags</InputLabel>
                  <Input
                    id="Tags"
                    margin="none"
                    placeholder="Red dress..."
                    startAdornment={
                      <InputAdornment position="start">
                        <LabelIcon />
                      </InputAdornment>
                    }
                  />
                </Grid>
                  <br />
                <Grid item>
                  <Button
                    variant="contained"
                    color="default"
                    fullWidth="true"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUpload}
                  >
                    Upload
                </Button>
                </Grid>
              </Grid>
              {/* </FormControl>  */}
              </Box>
              </Card>
              </CardContent>}
            </Box>

          <Box display="flex" justifyContent="flex-end" m={2} p={1}>
              <label htmlFor="upload-image-button"> 
              <Fab color="secondary" aria-label="add" component="span" className={classes.margin}>
                <AddIcon />
              </Fab>      
              </label>
          </Box>
      <input
        type="file"
        id="upload-image-button"
        name="uploadImage"
        multiple
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      {/* </FormControl> */}
      </Container>
  );
}