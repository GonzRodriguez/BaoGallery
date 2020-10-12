import Axios from "axios";

class Auth {
    constructor() {
        this.authenticated = false;
    }

    // login(cb) {
    //     this.authenticated = true;
    //     cb();
    // }
    async logout() {

        await Axios.get("http://localhost:3000/api/logout", { withCredentials: true}).then (response => {
            console.log(response);
            // this.props.history.push("/")
        })
            .then(window.location = "/")   
    }

//     async pepe() {

//         await Axios.get("http://localhost:3000/api/isAuth", { withCredentials: true})
        
//                                     .then(response => {
//                                         console.log(response.data);
//                                         if (response.data === true) {
//                                             this.login(()=>{console.log("Debería estar loggedIn " + this.authenticated)})
//                                         }//this.authenticated = response.data
//                                     }) 
//                                     return this.authenticated
//         // cb()
//         }
            
//       isAuthenticated() {
//          this.pepe().then(function (result) {
//              this.authenticated = result;
//             //  $("#output").append(result);
//          });
//         // this.pepe()
//         return this.authenticated
//     }
    
}

export default new Auth();
