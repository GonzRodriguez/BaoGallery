import React, { useState, useEffect, useContext } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, Avatar, Button, CssBaseline, InputBase, fade, Link, Grid, Typography, Collapse, Container, IconButton } from '@material-ui/core';
import { UserContext } from '../../context/UserContext'
import { ApiContext } from '../../context/ApiContext'; 
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
        marginTop: theme.spacing(1),
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
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.15),
        },

        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
        },
    },

    inputRoot: {
        color: "inherit",
        width: "100%"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
    },
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
          api.login({ username: loginUsername.toLowerCase(), password: loginPassword })
              .then( async function (response) {
                  localStorage.clear()
                  console.log(response);
                  if (response.data.ErrorMessage) {
                      localStorage.setItem("message", response.data.message)
                      window.location = response.data.redirectURI
                  }
                  if (response.data.success) {
                      localStorage.removeItem("message");
                      localStorage.setItem("refreshToken", response.data.token)
                      window.location = response.data.redirectURI
                  }
              })
                    
      } catch (error) {
          console.log(error);
      }  
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

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={classes.search}>
                                <InputBase
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    placeholder="Username"
                                    required
                                    fullWidth
                                    id="Username"
                                    type="Username"
                                    label="Username"
                                    name="Username"
                                    autoComplete="username"
                                    onChange={(event) => setLoginUsername(event.target.value)}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.search}>
                                <InputBase
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    placeholder="Password"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                />
                            </div>
                        </Grid>
                    </Grid>
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
                        <br/>
                        <Grid item >
                            <Link href="/signup" color="textSecondary">
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