import Axios from "axios";

    function logout() {

         Axios.get("http://localhost:3000/api/logout", { withCredentials: true}).then (response => {
            console.log(response.data);
            localStorage.setItem("tokens", response.data.auth)
        })
            .then(window.location = "/")   
    }


export default logout;
