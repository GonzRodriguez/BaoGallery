import React from 'react'
import { Typography, Container } from "@material-ui/core"

export default function About() {
    return (
        <Container maxWidth="md" style={{ padding: "3rem"}}>
            <Typography variant="h2">About this website</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Search users, tags & collections with the powered by MongoDB Atlas search bar.
            </Typography>
        </Container>
    )
}
