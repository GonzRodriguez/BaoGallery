import React, { useState, useContext } from 'react';
import { makeStyles, Modal, Backdrop, Fade, Button, FilledInput, FormHelperText, Box, Typography, InputLabel, Divider, FormControl, Avatar } from '@material-ui/core';
import { UserContext } from "../../context/UserContext"
import { ApiContext } from '../../context/ApiContext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileBase from 'react-file-base64'
import Spinner from "../Action-Components/spinner" 



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
        width: "100%",
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },

}));

export default function EditProfileForm() {
    const classes = useStyles();
    const user = useContext(UserContext)
    const api = useContext(ApiContext)

    const { username, avatar, email, webpage, instagram, facebook, snapchat, twitter, flickr, _id, bio} = user

    const [profileData, setProfileData] = useState({ 
        username: username,
        avatar: avatar,
        email: email,
        webpage: webpage,
        password: "",
        bio: bio,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,  
        snapchat: snapchat,
        flickr: flickr,
    });
    

    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordTag, setPasswordTag] = useState();
    const [open, setOpen] = useState(false);
    if (user == null) { return (<Spinner />) }

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
        

        api.editProfile(_id, profileData)
            .then(function (response) {
                console.log(response.data);
            })
            .then(window.location = "/dashboard")
            
    }
// Nota Mirar el css de Modal
    return (
        <div className={classes.editProfileForm}>
            <Button type="button" onClick={handleOpen}>
                <MoreVertIcon/>
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
                            <Box display="flex" alignItems="center">
                                <Box m={1}  >
                                    <Avatar alt="Avatar" src={avatar} className={classes.large} />
                                </Box>
                                
                                    <FileBase
                                        type="file"
                                        multiple={false}
                                        onDone={({ base64 }) => setProfileData({ ...profileData, avatar: base64 })}
                                    />
                                </Box>
                                <Box m={1}>
                                <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="Username">Username</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                placeholder="Username" 
                                name="username"
                                id="Username" 
                                className={classes.texfield}
                                />
                                </FormControl>
                                </Box>
                            <Box m={1} >
                                <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="Email">Email</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                placeholder="Email" 
                                name="email"
                                id="email"
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                            <Box m={1} >
                                <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="Bio">Bio</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.biography}
                                onChange={(e) => setProfileData({ ...profileData, biography: e.target.value })}
                                placeholder="Bio" 
                                rows="3"
                                name="email"
                                id="email"
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                        <Typography variant="h6">Contact details</Typography>
                        <Divider />
                            <Box display="block" >
                            <Box m={1} >
                            <FormControl variant="filled" fullWidth>
                            <InputLabel htmlFor="Web Page">Web Page</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.webpage}
                                onChange={(e) => setProfileData({ ...profileData, webpage: e.target.value })}
                                placeholder="Web Page" 
                                name="webpage"
                                id="webPage" 
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                            <Box m={1} >
                            <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="Instagram">Instagram</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.instagram}
                                onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                                placeholder="Instagram" 
                                id="Instagram"
                                name="instagram"
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                            <Box  m={1} >
                            <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="Facebook">Facebook</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.facebook}
                                onChange={(e) => setProfileData({ ...profileData, facebook: e.target.value })}
                                placeholder="Facebook" 
                                name="facebook"
                                id="Facebook" 
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                            <Box  m={1} >
                            <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="Twitter">Twitter</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.twitter}
                                onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                                placeholder="Twitter" 
                                name="twitter"
                                id="Twitter" 
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                            <Box  m={1} >
                            <FormControl variant="filled" fullWidth>
                            <InputLabel htmlFor="Snapchat">Snapchat</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.snapchat}
                                onChange={(e) => setProfileData({ ...profileData, snapchat: e.target.value })}
                                placeholder="Snapchat" 
                                name="snapchat" 
                                id="Snapchat" 
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                            <Box  m={1} >
                            <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="Flickr">Flickr</InputLabel>
                                <FilledInput
                                disableUnderline
                                value={profileData.flickr}
                                onChange={(e) => setProfileData({ ...profileData, flickr: e.target.value })}
                                placeholder="Flickr" 
                                name="flickr"
                                id="Flickr" 
                                className={classes.texfield}
                                />
                                </FormControl>
                            </Box>
                        </Box> 
                    <Typography variant="h6">Change your Password</Typography>
                    <Divider />
                                
                        <FormControl variant="filled" fullWidth>
                            <InputLabel htmlFor="Password">Password</InputLabel>
                            <FilledInput
                            disableUnderline
                            value={profileData.password}
                            onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                            placeholder="Password" 
                            error={ passwordTag }
                            type="password"
                            name="password"
                            id="Password"
                            className={classes.texfield}
                                />
                                </FormControl>
                            <FormHelperText>{passwordTag && <p style={{ color: "red" }}>Passwords don not match</p>}</FormHelperText>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel htmlFor="Confirm your Password">Confirm your Password</InputLabel>
                            <FilledInput
                            disableUnderline
                            placeholder="Confirm your Password" 
                            error={ passwordTag }
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className={classes.texfield}
                            onChange={(event) => setConfirmPassword(event.target.value)} />
                            </FormControl>
                            <FormHelperText>{passwordTag && <p style={{color: "red"}}>Password don not match</p>}</FormHelperText>
                        <Button type="submit" color="secondary" m={1} variant="outlined" fullWidth onClick={handlePasswordOnSubmit}>Submit</Button>
                        <Button color="inherit" m={1} onClick={handleClose} fullWidth >Discard</Button>

                        </div>
                    </form>
                </Fade>
            </Modal>
        </div>
    );
}