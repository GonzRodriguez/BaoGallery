
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext"
import Dropzone from "./createPost/Dropzone"
import Posts from "../Posts"
import ProfileCard from "./ProfileCard";
import { Tabs, Tab, Box, Typography, makeStyles, AppBar, Container } from '@material-ui/core';
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
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([])
    const user = useContext(UserContext)  
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Container>

            <ProfileCard profile={user}/>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
                        <Tab value="one" label="All your photos"  {...a11yProps('one')}
                        />
                        <Tab value="two" label="Upload" {...a11yProps('two')} />
                        <Tab value="three" label="filter" {...a11yProps('three')} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index="one">
                    <Posts collection={"profile"} query={user.username} /> 
                </TabPanel>
                <TabPanel value={value} index="two">
                    <Dropzone images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages} />
                </TabPanel>
                <TabPanel value={value} index="three">
                    Item Three
                </TabPanel>
            </div>
            
            {/* <img src="/uploads/money/posts/imageProfile.jpg" alt=""/> */}
        </Container>
    );
}