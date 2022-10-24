import { createContext } from "react";

export const authContext = createContext()

const AuthProvider = ({children}) => {
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider

