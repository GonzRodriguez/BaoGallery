import logout from "./logout"


const notAuthenticatedMenuItems = [
    {
        key: 0,
        menuTitle: "Home",
        pageURL: "/"
    },
    {
        key: 1,
        menuTitle: "Login",
        pageURL: "/login"
    },
    {
        key: 2,
        menuTitle: "Sign up",
        pageURL: "/signup"
    },

];

const authenticatedMenuItems = [
    {
        key: 0,
        menuTitle: "Home",
        pageURL: "/"
    },
    {
        key: 1,
        menuTitle: "Dashboard",
        pageURL: "/dashboard"
    },
    {
        key: 2,
        menuTitle: "Logout",
        action: (() => { logout() })
    }

];

export  {notAuthenticatedMenuItems, authenticatedMenuItems};