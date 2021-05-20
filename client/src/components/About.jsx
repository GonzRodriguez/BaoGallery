import React, {useState} from 'react'
import { Typography, Container, Link, Collapse, } from "@material-ui/core"

export default function About() {
    const [open, setOpen] = useState(false)

    return (
        <Container maxWidth="md" style={{ padding: "3rem", overflowWrap: "break-word"}}>
            <Typography variant="h2" gutterBottom>About this website</Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                If for any reason you have landed in this page I want you to feel really special, you are probably the only person that has done it apart from me. If you are not a recruiter, I suggest to get back to your life, here is nothing interesting to see. But if you are a recruiter,
            &nbsp;<Link onClick={() => setOpen(true)} component="button" color="textPrimary" variant="subtitle1">I'd like to say something to you</Link>
            </Typography>
            {open &&
                <Collapse in={open}>
                <img src="tenor.gif" alt="hello" width="400px"/>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                <br/>
                Once all the jokes are made, I wanted to explain the meaning of this website. 
                Due all the newbie mistakes I've made in the first place and seeing what a professional web looks like and the amount of improvements this 
                web could have. I'm aware of the security problems, the mess in the code, the unfinished components and much more.
                So I decided to deploy the app, and start from scratch. The new web will use tools like dockers, CI/CD, typescript, next.js among 
                other, and I will work on improving the security. 
                <br />
                But not everithing is wrong about deploying an unfinished app. 
                I've learn a lot building it and It's a representation of what I'm able to achieve and that I'm able to get many things done.
                <br/>
                I hope that at least you can come through all these mistakes and see my real skills.
                <br />
                <br />
                Thanks for your time
                <br />
                <br />
                <b>Gonzalo Rodriguez</b>
                </Typography>
                </Collapse>
             }
        </Container>
    )
}
