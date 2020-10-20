import Axios from "axios";

export default function getUser(cb) {
    let user = {}
    Axios.get("http://localhost:3000/api/reqUser", { withCredentials: true })
        .then(response => {
        user = response.data 
        localStorage.setItem("tokens", response.data.auth)
        cb(user)
        // .then()
    })
}

