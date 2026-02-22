import { TOKEN, USERNAME } from "../constants/constants"

const useLocalStorage = () => {

    const addTokenLs = (token: string) => localStorage.setItem(TOKEN, token)

    const getToken = () => localStorage.getItem(TOKEN)
    
    const deleteToken = () => localStorage.removeItem(TOKEN)

    const addUsernameLs = (username: string) => localStorage.setItem(USERNAME, username)

    const getUsername = () => localStorage.getItem(USERNAME)

    const deleteUsernameLs = () => localStorage.removeItem(USERNAME)

    return {
        addTokenLs,
        getToken,
        deleteToken,
        addUsernameLs,
        getUsername,
        deleteUsernameLs,
    }
}

export default useLocalStorage