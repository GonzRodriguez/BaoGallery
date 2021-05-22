
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext"
import Dropzone from "./createPost/Dropzone"
import Posts from "../Posts"
import { useTheme } from '@material-ui/core/styles';
import ProfileCard from "./ProfileCard";
import { Tabs, Tab, Box, Typography, makeStyles, AppBar, Container,useMediaQuery, Grid, } from '@material-ui/core';
import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={"span"}>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Dashboard() {

    const user = useContext(UserContext)  
    const classes = useStyles();
    const [value, setValue] = useState('one');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="lg" style={{margin: "1rem 0 1rem 0"}}>
            {!matches && 
            <Grid item xs={12} md={4}>
                <ProfileCard profile={user} />
            </Grid>}
            <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                <div className={classes.root}>
                    <AppBar position="static" color="secondary">
                        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
                            <Tab value="one" label="All your photos"  {...a11yProps('one')} />
                            <Tab value="two" label="Upload" {...a11yProps('two')} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index="one">
                        {user.posts.length > 0 ? 
                        <Posts collection={"profile"} query={user.username} /> 
                        :
                        <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                            <Typography variant="h4" align="center">Nothing uploaded yet</Typography>
                            <img src="/nothing-uploaded.svg" alt="No posts yet" style={{ height: "70vmin"}}/>
                        </div>
                        }
                    </TabPanel>
                    <TabPanel value={value} index="two">
                        <Dropzone />
                    </TabPanel>
                </div>            
            </Grid>
            {matches && 
            <Grid item xs={12} sm={4}>
                <ProfileCard profile={user} />
            </Grid>}
        </Grid>
        </Container>
    );
}