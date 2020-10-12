import Axios from "axios";

class Auth {
    constructor() {
        this.authenticated = false;
    }
    async logout() {

        await Axios.get("http://localhost:3000/api/logout", { withCredentials: true}).then (response => {
            console.log(response);
        })
            .then(window.location = "/")   
    }

    
}

export default new Auth();
