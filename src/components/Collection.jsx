/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { makeStyles, Container } from "@material-ui/core"
import { useParams } from "react-router-dom"
import Posts from './Posts';

const useStyles = makeStyles(() => ({
    root: {
        marginTop: "2vh",
        width: "fullWidth",
        borderRadius: 0,
    }

}));


function Collection() {
    const classes = useStyles();
    // const api = useContext(ApiContext)
    // const [coll, setCollection] = useState()
    const { collection, query } = useParams();


    return (
            <Container className={classes.root}>
                <Posts collection={collection} query={query} />
            </Container>
    )
}

export default Collection;