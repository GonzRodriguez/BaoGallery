// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Axios from "axios"
// import Avatar from "@material-ui/core/Avatar";
// import AddIcon from '@material-ui/icons/Add';
// import Fade from '@material-ui/core/Fade';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         // backgroundImage: 'url("../../public/avatar-default.png")'
//     },
//     avatarHover: {
//         backgroundColor: "rgba(0, 0, 0, 0.2);",
//         display: "flex",
//         width:"100%",
//         height: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "absolut",
//         zIndex: 1
//     },


// }));

// export default function UserAvatar(props) {
//     const [isShown, setIsShown] = useState(false);
//     const classes = useStyles();
//     const [profileAvatar, setProfileAvatar] = useState()
//     const {username, _id} = props.user

//     const handleAvatarUpload = async e => {
//         e.preventDefault();
//         const avatarFormData = new FormData(document.getElementById("uploadAvatarImage"));

//         // formData.append(date, username)
//         for (const p of avatarFormData) {
//             console.log("Avatar log", p);
//         }
//                 await Axios({
//                     method: "POST",
//                     url: `http://localhost:3000/api/upload-avatar/${_id}`,
//                     withCredentials: "same-origin",
//                     data: avatarFormData,
//                     headers: {
//                         "Accept": "multipart/form-data",
//                         "Content-Type": "application/x-www-form-urlencoded",
//                     },
//                 })
//                     .then(function (response) {
//                         console.log(response.data);
//                     })
//     }
 
//     Axios.get(`http://localhost:3000/api/get-images/avatar-image/${_id}`)
//     .then(function (response) {
//               console.log(response.data);
//           })




//     return (
//     <form id="uploadAvatarImage">   
//         {/* <img src="avatar.default.png" alt="Avatar" class="avatar"/> */}
//             <Avatar 
//             // className={classes.root}
//             variant="rounded"
//             onMouseEnter={() => setIsShown(true)}
//             onMouseLeave={() => setIsShown(false)}
//             >
//             {props.user.avatar}
//             <label htmlFor="upload-avatar-button">
//                 <Fade in={isShown} 
//                 // onChange={handleAvatarUpload}
//                 className={classes.avatarHover}
//                 >
//                     <AddIcon />
//                 </Fade>
//             </label>

//                 <input
//                     type="file"
//                     id="upload-avatar-button"
//                     name="uploadAvatar"
//                     style={{ display: "none" }}
//                     onChange={handleAvatarUpload}
//                 />

//             </Avatar>
//         </form>
//     )

// }

