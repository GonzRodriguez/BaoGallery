import React from 'react'
import { Typography } from '@material-ui/core'
export default function Error404() {
    return (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <img src="/error-404.svg" alt="No posts yet" style={{ height: "60vmin" }} />
                <Typography variant="h3" align="center">Something went wrong...</Typography>
            </div>
    )
}
