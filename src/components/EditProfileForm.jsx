import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Axios from "axios";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 0,
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function EditProfileForm(props) {
    const { username, email, webpage, socialMediaAccounts, _id, password} = props.user
    const { instagram, facebook, snapchat, twitter, flickr } = socialMediaAccounts

    const classes = useStyles();
    const [newUsername, setUsername] = useState();
    const [newEmail, setEmail] = useState();
    const [newWebpage, setWebpage] = useState();
    const [newInstagram, setInstagram] = useState();
    const [newFacebook, setFacebook] = useState();
    const [newTwitter, setTwitter] = useState();
    const [newSnapchat, setSnapchat] = useState();
    const [newFlickr, setFlickr] = useState();
    const [newPassword, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState()
    const [passwordTag, setPasswordTag] = useState();
    const [open, setOpen] = useState();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handlePasswordOnSubmit(){
        confirmPassword !== newPassword ? setPasswordTag("error") : updateProfile() 
    }
    
    const updateProfile = async () => {

        await Axios({
            method: "POST",
            url: `http://localhost:3000/api/editUser/${_id}`,
            withCredentials: "same-origin",
            data: {
                username: newUsername ,
                password: newPassword ,
                email: newEmail ,
                webpage: newWebpage ,
                instagram: newInstagram,
                facebook: newFacebook,
                twitter: newTwitter,
                snapchat: newSnapchat,
                flickr: newFlickr,
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
                console.log(response.data);
                handleClose()
                window.location = "/dashboard"
            })
    }
// Nota Mirar el css de Modal
    return (
        <div>
            <Button type="button" variant="outlined" onClick={handleOpen}>
                Edit Profile
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
                <Fade in={open}>
                    <FormControl>
                    <div className={classes.paper} >
                        <Typography variant="h5" mt={1}>Edit Your Profile</Typography>
                        <Divider/>
                            <Box display="flex" >
                                <Box  m={1}  >
                                    <Typography variant="body1" flexGrow={1}>Username</Typography>
                                <TextField 
                                variant="outlined" 
                                defaultValue={username} id="Username" 
                                onChange={(event) => setUsername(event.target.value)}/>
                                </Box>
                                <Box  m={1}  >
                                    <Typography variant="body1" flexGrow={1}>Email</Typography>
                                <TextField 
                                variant="outlined" 
                                defaultValue={email} 
                                id="email"
                                onChange={(event) => setEmail(event.target.value)}/>
                                </Box>
                            </Box>            
                        <Typography variant="h5">Contact details</Typography>
                        <Divider />
                            <Box display="flex" justifyContent="felex-start" flexWrap="wrap">
                            <Box m={1} >
                                <Typography variant="body1">Web Page</Typography>
                                <TextField 
                                variant="outlined" 
                                defaultValue={webpage} 
                                id="webPage" 
                                onChange={(event) => setWebpage(event.target.value)} />
                            </Box>
                            <Box m={1} >
                                <Typography variant="body1">Instagram</Typography>
                                <TextField 
                                defaultValue={instagram.account} 
                                variant="outlined" id="Instagram" 
                                onChange={(event) => setInstagram(event.target.value)} />
                            </Box>
                            <Box  m={1} >
                                <Typography variant="body1">Facebook</Typography>
                                <TextField 
                                variant="outlined" 
                                defaultValue={facebook.account } 
                                id="Facebook" 
                                onChange={(event) => setFacebook(event.target.value)}/>
                            </Box>
                            <Box  m={1} >
                                <Typography variant="body1">Twitter</Typography>
                                <TextField 
                                variant="outlined" 
                                defaultValue={twitter.account} 
                                id="Twitter" 
                                onChange={(event) => setTwitter(event.target.value)}/>
                            </Box>
                            <Box  m={1} >
                                <Typography variant="body1">Snapchat</Typography>
                                <TextField variant="outlined" 
                                defaultValue={snapchat.account } 
                                id="Snapchat" 
                                onChange={(event) => setSnapchat(event.target.value)} />
                            </Box>
                            <Box  m={1} >
                                    <Typography variant="body1">Flickr</Typography>
                                <TextField 
                                variant="outlined" 
                                defaultValue={flickr.account } 
                                id="Flickr" 
                                onChange={(event) => setFlickr(event.target.value)} />
                            </Box>
                        </Box> 
                    <Typography variant="h5">Change your Password</Typography>
                    <Divider />
                        <Box display="flex">
                            <Box  m={1}  >
                                <Typography variant="body1"  flexGrow={1}>Password</Typography>
                                    <OutlinedInput 
                                        error={ passwordTag }
                                        type="password"
                                        variant="outlined"
                                        id="confirmPassword"
                                        onChange={(event) => setPassword(event.target.value)} />
                                    <FormHelperText>{passwordTag && <p style={{ color: "red" }}>Passwords don not match</p>}</FormHelperText>
                            </Box>
                            <Box  m={1} mb={3}>
                                <Typography variant="body1" flexGrow={1}>Confirm your Password</Typography>
                                    <OutlinedInput 
                                        error={ passwordTag }
                                        type="password"
                                        variant="outlined"
                                        id="confirmPassword"
                                        onChange={(event) => setConfirmPassword(event.target.value)} />
                                    <FormHelperText>{passwordTag && <p style={{color: "red"}}>Password don not match</p>}</FormHelperText>
                            </Box>
                        </Box>
                        <Button color="secondary" m={1} variant="outlined" fullWidth="true" onClick={handlePasswordOnSubmit}>Submit</Button>
                        <Button color="inherit" m={1} onClick={handleClose} fullWidth="true">Discard</Button>

                        </div>
                    </FormControl>
                </Fade>
            </Modal>
        </div>
    );
}