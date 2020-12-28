import React, { useState } from "react";

import { makeStyles, Card, CardContent, Grid, Container } from '@material-ui/core';
import CreatePostForm from "./CreatePostForm"
import PreviewImages from "./PreviewImages"
import Dropzone from "./Dropzone"


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      borderRadius: "0"
    },
    margin: {
    margin: theme.spacing(1),
    },
    uploadForm: {
      margin: "2% auto"
    },
    input: {
      margin: 0,
    }
}));

export default function CreatePost() {
  const [previewImages, setPreviewImages] = useState([]);
  const classes = useStyles();
  const [images, setImages] = useState([])
  
  return (
    <Container >
      <Grid item sm={8} style={{margin: "auto"}} >
      <Dropzone images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages}/>
      </Grid>
      <Grid container justify="center" spacing={2}>
        <PreviewImages images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages}/>
      </Grid>
        {images.length > 0 && 
          <Grid  >
            <Grid item xs={12} sm={7} md={5} className={classes.uploadForm}>
              {/* <Card > */}
                <CardContent>
                  <CreatePostForm images={images} previewImages={previewImages}/>
                </CardContent>
              {/* </Card> */}
            </Grid>
          </Grid>
        }
    </Container>
  );
}