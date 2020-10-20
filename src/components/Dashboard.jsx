
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ShareIcon from '@material-ui/icons/Share';
import EditProfileForm from "./EditProfileForm"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        borderRadius: 0,
        // backgroundColor: "#F5EB00"
    },
    icons: {
        color: "#000",
        fontSize: "2vh",
    },
    title:{
        fontFamily: "Abril Fatface",
    },

}));

export default function Dashboard(props) {
    const classes = useStyles();
    const {socialMediaAccounts, username, webpage, email} = props.user

    const accounts = []

        for (const [index, value] of Object.entries(socialMediaAccounts)) {
            accounts.push(
                <Typography><i class={value.account && value.icon}>&nbsp;</i><strong>{value.account && index} &nbsp;</strong>{value.account}</Typography>
            )
        }

    return (
        <div>

            {/* ----------------------------------   Header  ----------------------------------- */}

        <Card variant="outlined" className={classes.root}>
            <Box display="flex" justifyContent="space-between">
                <Box mx={1} my={1}>
                    <CardHeader
                        avatar={
                            <Avatar variant="rounded" ></Avatar>
                        }
                        title={<Typography className={classes.title} color="textPrimary" >
                        <h1>|{username}</h1>
                        </Typography>}
                            subheader={<p><i class="fas fa-at"></i> {email} <i class="far fa-address-card"></i> {webpage}</p>}
                        />
                </Box>
                    <Box mx={4} my={6}>
                        <EditProfileForm user={props.user} alert={alert} />
                    </Box>
            </Box>
        <Box style={{ width: '100%' }} >
            <Box display="flex" justifyContent="space-between">
                <Box mx={1} my={1}>
                    <CardActions style={{width: "100%"}} >
                        {accounts}
                    </CardActions> 
                </Box>
                        <Box mx={4}><ShareIcon /></Box>
            </Box>
        </Box>
        </Card>
            {/* ----------------------------------   Photos Section  ----------------------------------- */}
            <Button color="secondary" variant="outlined"> Upload img </Button>
        </div>
    );
}