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
            main: '#212121',

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