import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Axios from "axios";


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
}));

export default function LogIn() {
    const classes = useStyles();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [serverMessage, setMessage] = useState({ message: "", state: null });

    const login = async () => {


        await Axios({
            method: "POST",
            url: "http://localhost:3000/api/login",
            withCredentials: "same-origin",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data.statusMessage === "error") {
                    localStorage.setItem("message", response.data.message)
                }
                if (response.data.success === true) {
                    localStorage.clear();
                        window.location = response.data.redirectURI
                }

            })
    }
    useEffect(() => {
        setMessage({ message: localStorage.getItem("message"), state: true });
        setTimeout(localStorage.clear(), 100000);
    }, []) 

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Collapse in={serverMessage.state} style={{ display: serverMessage.message ? 'block' : 'none' }} >
                <Alert severity="error">{serverMessage.message}</Alert>
            </Collapse>
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
    );
}