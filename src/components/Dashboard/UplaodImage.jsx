// import React, { useState, useContext } from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import AddIcon from '@material-ui/icons/Add';
// import Container from '@material-ui/core/Container';
// import Axios from "axios";
// import { ApiContext } from "../../context/ApiContext";
// import { UserContext } from "../../context/UserContext";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: "flex",
//       alignItems: "center"
//     },
//     fileUpload : {  
//       border: "1px solid #ccc",
//       borderRadius: "50px",
//       display: "inline-block",
//       padding: "8px 10px",
//       cursor: "pointer",
//     },
//     img: {
//       borderRadius: "8px",
//       maxWidth: "40vh",
//       cursor: "pointer",
//     },
//     margin: {
//     margin: theme.spacing(2),
//   }

// }));

// export default function UploadImage(props) {
//   const [image, setImage] = useState({ preview: "", raw: ""});
//   const user = useContext(UserContext)
//   const api = useContext(ApiContext)

//     const classes = useStyles();


//   const handleChange = e => {
//     if (e.target.files.length) {
//       setImage({
//         preview: URL.createObjectURL(e.target.files[0]),
//         raw: e.target.files[0],  
//       });
//     }
//     handleUpload();
//   };
//   const {username, _id} = user.data

//   const handleUpload = async e => {
//     e.preventDefault();
//     const imageFormData = new FormData(document.getElementById("uploadImage"));

//     // formData.append(date, username)
//     for (const p of imageFormData){
//           console.log("image log", p);
//       }
//     await Axios.post(`http://localhost:3000/api/upload-image/${username}/${_id}`, { author: username })
//     .then(
//     await Axios({
//           method: "POST",
//           url: `http://localhost:3000/api/upload-image/${_id}`,
//           withCredentials: "same-origin",
//           data: imageFormData,
//           headers: {
//               "Accept": "multipart/form-data",
//               "Content-Type": "application/x-www-form-urlencoded",
//           },
//           })
//           .then(function (response) {
//               console.log(response.data);
//           })
//       )
//     } 
//   return (
//       <div className={classes.root}>
//       <Container m>
//       <form id="uploadImage">
//       <label htmlFor="upload-image-button">
//         {image.preview ? (
//         <img src={image.preview} alt="dummy" className={classes.img}/>
//         ) : (
//           <>
//             <h5 className={classes.fileUpload}><AddIcon/></h5>
//           </>   
//         )}
//       </label>
//       <input
//         type="file"
//         id="upload-image-button"
//         name="uploadImage"
//         style={{ display: "none" }}
//         onChange={handleChange}
//       />
//           <button style={{alignItems: "center"}} onClick={handleUpload}>Upload</button>
//       <br />
//       </form>
//       </Container>
//     </div>
//   );
// }