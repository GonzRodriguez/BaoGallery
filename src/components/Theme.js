import {createMuiTheme} from "@material-ui/core/styles";


const theme = createMuiTheme({
    typography: {
        useNextVariants: true, 
        fontFamily: [
            "Roboto, Arial",
            "Bebas Neue",
            "Abril Fatface"
    ]
    },
    palette: {
        primary: {
            main: "#00170A",

        },
        secondary: {
            main: "#074A49",
        },
        background:{
            default: "#ECF0FB"
        },
        info: {
            main: "#00000"
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
    
});

export default theme;