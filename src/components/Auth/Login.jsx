import React, { useState, useEffect, useContext } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Collapse, Container, IconButton } from '@material-ui/core';
import { UserContext } from '../../context/UserContext'
import { ApiContext } from '../../context/ApiContext'; 
import CloseIcon from '@material-ui/icons/Close';
import _ from "lodash"


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
        marginTop: theme.spacing(1),
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

export default function LogIn(props) {
    const classes = useStyles();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState();
    const [serverMessage, setServerMessage] = useState({ message: "", state: null });
    const [open, setOpen] = useState(false);
    const user = useContext(UserContext)
    const api = useContext(ApiContext)

    
    const login = async (e) => {
        e.preventDefault();


      try {
           api.login({ username: _.lowerCase(loginUsername), password: loginPassword })
              .then( async function (response) {
                  localStorage.clear()
                    console.log(response.data);
                  if (response.data.ErrorMessage) {
                      localStorage.setItem("message", response.data.message)
                      console.log(serverMessage);
                      window.location = response.data.redirectURI
                  }
                  if (response.data.success) {
                      window.location = response.data.redirectURI
                  }
              })
                    
      } catch (error) {
          console.log(error);
      }  
        
            // .then(getUser())
    }
    useEffect( () => {

        const itemMessage = localStorage.getItem("message");
        itemMessage && setOpen(true)
        setServerMessage({ message: itemMessage, state: true });
        }, [user]) 

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
                    Log in
        </Typography>
                <form className={classes.form} noValidate onSubmit={login}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => setLoginUsername(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setLoginPassword(event.target.value)}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onSubmit={login}
                    >
                        Log In
          </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/login" color="textSecondary">
                                Forgot password?
                            </Link>
                        </Grid>
                        <br/>
                        <Grid item >
                            <Link href="/login" color="textSecondary">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    </div>
    );
}