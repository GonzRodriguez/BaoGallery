import {createMuiTheme} from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true, 
        fontFamily: [
            'Roboto, Arial',
            '"Bebas Neue"'
    ]
    },
    palette: {
        primary: {
            // light: '#9e9e9e',
            main: '#212121',
            // dark: '#006db3',
            // contrastText: '#ffff',
        },
        secondary: {
            light: 'ff80ab',
            main: '#f50057',
            dark: '#c51162',
            contrastText: '#ffff',
        },
        type: "dark"
    },
    shape: {
        borderRadius: 10
    }
    
});

export default theme;