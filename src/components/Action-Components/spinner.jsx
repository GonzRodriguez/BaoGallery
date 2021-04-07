import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



class spinner extends Component {
    render() {
        const spinner = {
            display: "flex",
            height: "20rem",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }
        return (
            <div style={spinner}>
                <CircularProgress color="primary" />
            </div>
        );
    }
}

export default spinner;