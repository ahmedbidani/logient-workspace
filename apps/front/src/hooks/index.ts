export function useAuth(){

    const setToken = (token: string) => {
        localStorage.setItem("token", token);
    }

    const loggedIn = () => {
        return localStorage.getItem("token");
        
    }

    const logOut = () => {
        localStorage.removeItem("token");
    }

    return {
        logOut,
        loggedIn,
        setToken,
    }
}