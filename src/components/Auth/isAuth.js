import axios from "axios"


export default function isAuthUser() {
    
    const refreshToken = localStorage.getItem("refreshToken")

    if (refreshToken) {
        return axios.post("https://baogallery.herokuapp.com/api/is-auth", refreshToken, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "https://localhost:3001",
                "Authorization": `Bearer ${refreshToken}`
            }})
        .then(res => {
            if (res.status === 202) {
                localStorage.setItem("refreshToken", res.data.token)
                return {auth: true, user: res.data.user, isLoading: false}
            }

            localStorage.clear()
            return { auth: false, user: null, isLoading: false }
        })
        .catch(function (error) { console.log(error) })
    }
    return { auth: false, user: null, isLoading: false }

}