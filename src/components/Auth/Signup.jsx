/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import _ from "lodash"
import { ApiContext } from '../../context/ApiContext';
import { IconButton, Collapse, Avatar, Button, CssBaseline, Link, Grid, Typography, makeStyles, Container, TextField  } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        width: "75vh",
        margin: "auto",
        marginTop: theme.spacing(2)
    }
}));




export default function SingUp() {
    const classes = useStyles();
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [serverMessage, setServerMessage] = useState({message: "", state: null});
    const [open, setOpen] = useState(false);

    const api = useContext(ApiContext)
    
    const register = async (e) => {

        e.preventDefault();

        try {
            api.signup({
                username: _.lowerCase(registerUsername),
                email: _.toLower(registerEmail),
                password: registerPassword
            })
                .then(function (response) {
                    // localStorage.clear()
                    console.log(response, response.data);
                    if (response.data.ErrorMessage) {
                        localStorage.setItem("message", response.data.message)
                    }
                    if (response.data.success) {
                        localStorage.removeItem("message");
                        localStorage.setItem("refreshToken", response.data.token)
                        console.log(response.data.redirectURI);
                        window.location = response.data.redirectURI
                    }

                })
        } catch (error) {
            console.log(error);
        }
               
    }
    
    useEffect(() => {
        const itemMessage = localStorage.getItem("message");
        itemMessage && setOpen(true)
        setServerMessage({ message: itemMessage, state: true });
        }, []) 
    
        
    return (
        <div>
            <Collapse in={open} style={{ display: serverMessage.message ? 'block' : 'none' }} >
                <Alert
                    severity="error"
                    variant="filled"
                    className={classes.alert}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>Error</AlertTitle>
                    {serverMessage.message}
                </Alert>
            </Collapse>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form}   noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="Username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                onChange={(event) => setRegisterUsername(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(event) => setRegisterEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setRegisterPassword(event.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            /> */}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={register}
                        className={classes.submit}
                    >
                        Sign Up
          </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" color="textSecondary">
                                {"Already have an account? Sign in"}
                            </Link>
                            
                        </Grid>
                        
                    </Grid>
                    
                </form>
            </div>

        </Container>
        </div>
    );
}