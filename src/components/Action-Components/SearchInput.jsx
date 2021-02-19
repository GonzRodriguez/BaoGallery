import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles, IconButton } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    input: {
        backgroundColor: "#e9e9e9",
        height: "3rem",
        width: "30vw",
        minWidth: "300px",
        padding: "9px",
        fontFamily: "Saira Condensed",
        fontWeight: 600,
        fontSize: "1rem",
        margin: "10px",
        boxShadow: "-5px 5px 0px black",
        border: "solid 5px black",
        cursor: "pointer",
        borderRadius: 0,
    },
  
    inputDiv: {
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        right: "15px",
        bottom: "10px"
    }
}))

export default function SearchInput() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.inputDiv}>  
                <input className={classes.input} placeholder="Artist, collection, picture..." ></input>
                <IconButton className={classes.icon}  aria-label="search" component="span">
                    <SearchIcon />
                </IconButton>
            </div>
        </>
    )
}
