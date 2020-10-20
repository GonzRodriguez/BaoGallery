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
            main: "#F5EB00",

        },
        secondary: {
            main: "#650CF5",
        },
        background:{
            default: "#ffff"
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