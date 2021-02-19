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
            main: "#fffff",
            dark: "#cccccc"
        },
        secondary: {
            main: "#074A4A",
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
        main: "#0000"
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