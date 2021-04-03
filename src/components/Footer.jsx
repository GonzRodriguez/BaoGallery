/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Photure
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function footer() {
    return (
        <Grid position="fixed"  >
                    {/* <Typography className={classes.text} variant="h5" align="center">{"A ver que sale"}</Typography> */}
                <Box mt={5}>
                    <Copyright />
                </Box>
        </Grid>
      
    )
}

