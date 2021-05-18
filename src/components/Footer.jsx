/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Divider, Link, Typography, Grid, List, ListItemText, ListItem} from "@material-ui/core/"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{marginTop: "3rem"}}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.baogallery.herokuapp.com">
                Bao Gallery
            </Link>
            {' '}
            {new Date().getFullYear()}
        </Typography>
    );
}
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function footer() {
    return (
        <div style={{ padding: "3rem", backgroundColor: "#efefefcc", marginTop: "4rem" }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} zeroMinWidth>
                <Typography variant="body2" color="textPrimary" align="center">
                    Made with ❤ by&nbsp;         
                    <Link color="textPrimary" href="https://www.grgslamanca.com/" >
                        <b>Gonzalo Rodriguez</b>
                    </Link>
                </Typography>
            </Grid>
                    <Divider orientation="vertical" flexItem />
            <Grid item xs>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItemLink href="/about">
                            <ListItemText primary="About This Website" />
                        </ListItemLink>
                        <ListItemLink href="https://github.com/GonzRodriguez">
                            <ListItemText primary="GitHub" />
                        </ListItemLink>
                        <ListItemLink href="https://www.linkedin.com/in/developer-gonzalo-rgs/">
                            <ListItemText primary="Linkedin" />
                        </ListItemLink>
                    </List>
            </Grid>
        </Grid>
            <Copyright />

        </div>
      
    )
}

