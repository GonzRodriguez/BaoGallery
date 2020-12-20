import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from "../../context/UserContext"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ApiContext } from '../../context/ApiContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const useStyles = makeStyles((theme) => ({
    modal: {
        margin: "auto",
        maxWidth: "100vh", 
        alignItems: 'center',
        justifyContent: 'center',
        outline: "none",
        border: 0,
        overflow: "scroll",
        minHeight: "20vh" 
        },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 0,
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    texfield: {
        width: "100%"
    }
}));

export default function EditProfileForm() {
    const classes = useStyles();
    const user = useContext(UserContext)
    const api = useContext(ApiContext)

    const { username, email, webpage, instagram, facebook, snapchat, twitter, flickr, _id} = user.data

    const [profileData, setProfileData] = useState({ 
        username: username,
        email: email,
        webpage: webpage,
        password: undefined,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,  
        snapchat: snapchat,
        flickr: flickr,
    });
    

    const [confirmPassword, setConfirmPassword] = useState(undefined)
    const [passwordTag, setPasswordTag] = useState();
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handlePasswordOnSubmit(e){
        e.preventDefault();
        
        confirmPassword !== profileData.password ? setPasswordTag("error") : updateProfile() 
    }
    const updateProfile = async () => {
        

        // let editFormData = new FormData(document.getElementById("form"));
        // function convertFD2JSON(formData) {
        //     let obj = {};
        //     for (let key of formData.keys()) {
        //         obj[key] = formData.get(key);
        //     }
        //     return JSON.stringify(obj);
        // }
        // let jsonData = convertFD2JSON(editFormData);
        // console.log(jsonData);
console.log(profileData);

        api.tryProfile(_id, profileData)
            .then(function (response) {
                console.log(response.data);
                handleClose()
            })
            
    }
// Nota Mirar el css de Modal
    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                <MoreHorizIcon/>
      </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}
            >
                <Fade in={open} >
                    <form id="form">
                    <div className={classes.paper} >
                        <Typography variant="h6" mt={1}>Edit Your Profile</Typography>
                        <Divider/>
                            <Box display="flex" >
                                <Box m={1} flexGrow={1} >
                                <TextField
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                label="Username" 
                                name="username"
                                id="Username" 
                                className={classes.texfield}
                                />
                                </Box>
                                <Box m={1} flexGrow={1}  >
                                <TextField
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                label="Email" 
                                name="email"
                                id="email"
                                className={classes.texfield}
                                />
                                </Box>
                            </Box>            
                        <Typography variant="h6">Contact details</Typography>
                        <Divider />
                            <Box display="block" >
                            <Box m={1} >
                                <TextField
                                value={profileData.webpage}
                                onChange={(e) => setProfileData({ ...profileData, webpage: e.target.value })}
                                label="Web Page" 
                                name="webpage"
                                id="webPage" 
                                className={classes.texfield}
                                />
                            </Box>
                            <Box m={1} >
                                <TextField
                                value={profileData.instagram}
                                onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                                label="Instagram" 
                                id="Instagram"
                                name="instagram"
                                className={classes.texfield}
                                />
                            </Box>
                            <Box  m={1} >
                                <TextField
                                value={profileData.facebook}
                                onChange={(e) => setProfileData({ ...profileData, facebook: e.target.value })}
                                label="Facebook" 
                                name="facebook"
                                id="Facebook" 
                                className={classes.texfield}
                                />
                            </Box>
                            <Box  m={1} >
                                <TextField
                                value={profileData.twitter}
                                onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                                label="Twitter" 
                                name="twitter"
                                id="Twitter" 
                                className={classes.texfield}
                                />
                            </Box>
                            <Box  m={1} >
                                <TextField
                                value={profileData.snapchat}
                                onChange={(e) => setProfileData({ ...profileData, snapchat: e.target.value })}
                                label="Snapchat" 
                                name="snapchat" 
                                id="Snapchat" 
                                className={classes.texfield}
                                />
                            </Box>
                            <Box  m={1} >
                                <TextField
                                value={profileData.flickr}
                                onChange={(e) => setProfileData({ ...profileData, flickr: e.target.value })}
                                label="Flickr" 
                                name="flickr"
                                id="Flickr" 
                                className={classes.texfield}
                                />
                            </Box>
                        </Box> 
                    <Typography variant="h6">Change your Password</Typography>
                    <Divider />
                            <Box display="flex" >
                                <Box m={1} flexGrow={1} >
                                    <TextField
                                        value={profileData.password}
                                        onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                                        label="Password" 
                                        error={ passwordTag }
                                        type="password"
                                        name="password"
                                        id="Password"
                                        className={classes.texfield}
                                         />
                                    <FormHelperText>{passwordTag && <p style={{ color: "red" }}>Passwords don not match</p>}</FormHelperText>
                            </Box>
                                <Box m={1} mb={3} flexGrow={1}>
                                    <TextField
                                        label="Confirm your Password" 
                                        error={ passwordTag }
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className={classes.texfield}
                                        onChange={(event) => setConfirmPassword(event.target.value)} />
                                    <FormHelperText>{passwordTag && <p style={{color: "red"}}>Password don not match</p>}</FormHelperText>
                            </Box>
                        </Box>
                        <Button type="submit" color="secondary" m={1} variant="outlined" fullWidth onClick={handlePasswordOnSubmit}>Submit</Button>
                        <Button color="inherit" m={1} onClick={handleClose} fullWidth >Discard</Button>

                        </div>
                    </form>
                </Fade>
            </Modal>
        </div>
    );
}