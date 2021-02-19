import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



class spinner extends Component {
    render() {
        const spinner = {
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
        }
        return (
            <div style={spinner}>
                <CircularProgress color="secondary" />
            </div>
        );
    }
}

export default spinner;