/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import _ from "lodash"
import { ApiContext } from '../../context/ApiContext';
import { IconButton, Collapse, Avatar, Button, CssBaseline, Link, Grid, InputBase, fade, Typography, makeStyles, Container, TextField  } from '@material-ui/core';
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
        backgroundColor: "black",
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(3),
    },
    submit: {
        backgroundColor: "#e9e9e9",
        height: "2.5rem",
        width: "100%",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        boxShadow: "-5px 5px 0px black",
        border: "solid 5px black",
        cursor: "pointer",
        borderRadius: 0,
    },
    alert: {
        width: "75vh",
        margin: "auto",
        marginTop: theme.spacing(2)
    },
    search: {
        spacing: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: "5px",
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.15),
        },

        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    
    inputRoot: {
        color: 'inherit',
        width: "100%"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));




export default function SingUp() {
    const classes = useStyles();
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();


    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const api = useContext(ApiContext)
    
    const validateEmail = () => {
        if (!registerEmail.match(pattern)) {
            setOpen(true)
            setErrorMessage("Please, introduce a valid email format")
        }
    }
    const validatePassword = () => {
        if (registerPassword.length < 8) {
            setOpen(true)
            setErrorMessage("Password must be longer than 8 characters")
        }
    }
    const checkAnyEmptyInputField = () => {
        if (!registerUsername || !registerPassword || !registerEmail) {
            setOpen(true)
            setErrorMessage("All the fields are required")
        }
        register()
    }
    
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

        }, []) 
    
        
    return (
        <div>
            <Collapse in={open} >
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
                    {errorMessage}
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
                            <div className={classes.search}>
                                <InputBase
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                fullWidth
                                placeholder="Username"
                                name="Username"
                                required
                                id="username"
                                label="Username"
                                autoFocus
                                onChange={(event) => setRegisterUsername(event.target.value)}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.search}>
                            <InputBase
                                placeholder="Email"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onBlur={() => validateEmail()}
                                onChange={(event) => setRegisterEmail(event.target.value)}
                            />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.search}>
                                <InputBase
                                    placeholder="Password"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    id="password"
                                    onBlur={() => validatePassword()}
                                    autoComplete="current-password"
                                    onChange={(event) => setRegisterPassword(event.target.value)}
                                />                                    
                                
                            </div>
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
                        onClick={() => {checkAnyEmptyInputField()}}
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