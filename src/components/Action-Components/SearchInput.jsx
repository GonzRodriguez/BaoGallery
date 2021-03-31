import React, { useContext, useEffect, useState } from 'react';
import { makeStyles,  Typography, MenuItem,  Link, ClickAwayListener, InputBase, } from "@material-ui/core";
import { ApiContext } from "../../context/ApiContext"
import LabelIcon from '@material-ui/icons/Label';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CollectionsIcon from '@material-ui/icons/Collections'
const useStyles = makeStyles((theme) => ({

    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    dropDownMenu: {
        position: "absolute",
        zIndex: "100",
        width: "100%",
        left: 0
    },
    menuItem: {
        backgroundColor: theme.palette.grey[200],
        "&:hover": {
            backgroundColor: theme.palette.grey[300],
            zIndex: 5,
        }
    }
}))

export default function SearchInput(props) {
    const classes = useStyles();
    const api = useContext(ApiContext)
    const [searchResult, setSearchResult] = useState([])
    const [links, setLink] = useState([])
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);

    const handleClickAway = () => {
        setOpen(false);
        setQuery("");
    };
    const isSearchBarOpen = () => {
        if (!open) {
            setLink([]);
            setSearchResult([])
        };
    };
    const includesQuery = (array) => {
        return array.filter((item) => item.includes(query))
    }
    const removeDuplicates = (array) => {
        // return array.length && array.reduce((unique, item) => unique.includes(item) ? unique : item.length > 1 && [...unique, item])
        const set = new Set(array)
        return set
    }
    const handleAutocomplete = (data) => {

        if (Boolean(query.length)) {
            // 1. Extract all tags to a single array
            let tagsArray = []
            console.log(open);

            data.map(item => item.tags.map(tag => tagsArray.push(tag)))
            const creatorArray = data.map(item => item.creator)
            const collectionArray = data.map(item => item.imgCollection)


            // 2. Extract all the fileds that contains the query and pass them to an array
            const creatorIncludesQuery = includesQuery(creatorArray)
            const collectionIncludesQuery = includesQuery(collectionArray)
            const tagsIncludesQuery = includesQuery(tagsArray)

            // 3. remove duplicated items from array
            const creatorArrayOfSingles = removeDuplicates(creatorIncludesQuery)
            const collectionArrayOfSinlges = removeDuplicates(collectionIncludesQuery)
            const tagsArrayOfSinlges = removeDuplicates(tagsIncludesQuery)
            console.log(creatorArrayOfSingles);
            console.log(collectionArrayOfSinlges);
            console.log(tagsArrayOfSinlges);

            // 4. add to set
            for (const el of creatorArrayOfSingles) {
                console.log(el);

                el.length > 1 && setSearchResult(prevLink => [...prevLink, { type: "profile", value: el, icon: <AccountCircleIcon /> }])
                console.log(el);
            }
            for (const el of collectionArrayOfSinlges) {
                el.length > 1 && setSearchResult(prevLink => [...prevLink, { type: "collection", value: el, icon: <CollectionsIcon /> }])
            }

            for (const el of tagsArrayOfSinlges) {
                console.log(el);
                el.length > 1 && setSearchResult(prevLink => [...prevLink, { type: "tags", value: el, icon: <LabelIcon /> }])
            }
            // 5. handle links state

            for (let item of searchResult.values()) {
                setLink(prevLink => [...prevLink,
                <MenuItem key={searchResult._id} className={classes.menuItem}>
                    <Link href={`/${item.type}/${item.value}`} color="inherit" variant="button">
                        <Typography style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }} variant="button">{item.icon}{item.value}</Typography>
                    </Link>
                </MenuItem>])
            }
        }
    }

    useEffect(() => {
        query &&
            (async () => {
                const { data } = await api.search(query)
                setData(data)
                setOpen(true);
            })()
        isSearchBarOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    return (
        <>
            <div className={classes.search}>
                <InputBase placeholder="Search…" classes={{ root: props.styleName }}  value={query}
                    onChange={e => { setQuery(e.target.value.toLowerCase()) }}
                    onKeyDown={() => { setSearchResult([]); setLink([]); handleAutocomplete(data) }}
                    inputProps={{ 'aria-label': 'search' }}
                    autoFocus
                />
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.dropDownMenu}>
                        {links}
                    </div>
                </ClickAwayListener>
            </div>
        </>
    )
}
