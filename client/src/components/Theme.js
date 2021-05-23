import {createMuiTheme} from "@material-ui/core/styles";


const theme = createMuiTheme({
    typography: {
        useNextVariants: true, 
        fontFamily: [
            "Roboto, Arial",
            "Bebas Neue",
            "Abril Fatface",
            "Righteous", 
            "cursive"
    ]
    },
    palette: {
        primary: {
            light: "#e9e9e9",
            main: "#cccc",
        },
        secondary: {
            main: "#000",
        },
        background:{
            default: "white"
        },
        info: {
            main: "#4A0738"
        }
    },
    shape: {
        borderRadius: 10
    },
    textPrimary: {
        main: "blue"
    },
    textSecondary: {
        main: "#ffff"
    },
    border: {
        border: "solid 5px black"
    },
    fontFamily: {
        body: "Saira Condensed"
    }


});

export default theme;