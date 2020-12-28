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
            light: "#327D7D",
            main: "#00170A",
            dark: "#330D16"
        },
        secondary: {
            main: "#074A4A",
        },
        background:{
            default: "#ECF0FB"
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
    
});

export default theme;