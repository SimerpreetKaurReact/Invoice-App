import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { setCookie, removeCookies, getCookie } from "cookies-next"
import { setAPIUserToken } from "../api/auth"
import { COMPANY_DETAILS } from "../company/CompanyDetailsAuth"
import { useSnackbar } from 'notistack';

export const enum UserAuthState {
    UNDECIDED = "UNDECIDED", PENDING = "PENDING", AUTH = "AUTH", NOT_AUTH = "NOT_AUTH",

}
interface AuthContextType {
    authState: UserAuthState;
    persistLogin: (token?: string) => unknown,
    logout: (error: string) => unknown,
    AuthError: string | null
}


export const USER_TOKEN_COOKIE_KEY = 'userToken'
export const AuthContext = createContext<null | AuthContextType>(null)
export const AuthContextProvider = (props: { children: React.ReactNode }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [token, setToken] = useState<null | string>(null)
    const [error, setError] = useState<null | string>(null)
    const [authState, setAuthState] = useState<UserAuthState>(UserAuthState.UNDECIDED)
    useEffect(() => {
        const cookieToken = getCookie(USER_TOKEN_COOKIE_KEY)
        console.log("cookies token", cookieToken)
        if (cookieToken) {
            setToken(cookieToken as string)
            setAPIUserToken(cookieToken as string, logout)
            setAuthState(UserAuthState.AUTH)
        } else {
            setToken(null)
            setAuthState(UserAuthState.NOT_AUTH)
        }
    }, [])
    const logout = useCallback((AuthError: string) => {
        removeCookies(USER_TOKEN_COOKIE_KEY)
        removeCookies(COMPANY_DETAILS)
        setError(AuthError)
        console.log(error, "logout")
        setAuthState(UserAuthState.NOT_AUTH)
        enqueueSnackbar(`Session expired, please login again`, { variant: "error" })
    }, [])
    const persistLogin = useCallback((token?: string) => {
        console.log("auth context needs to handle login", token)
        setToken(token ?? null)
        if (token) {
            setCookie(USER_TOKEN_COOKIE_KEY, token)

            setAPIUserToken(token, logout)
            setAuthState(UserAuthState.AUTH)
            console.log(authState)
        } else {
            removeCookies(USER_TOKEN_COOKIE_KEY)
            removeCookies(COMPANY_DETAILS)
            setAuthState(UserAuthState.NOT_AUTH)
            // setAPIUserToken(null)
            console.log("unset user token")
        }
    }, [logout])

    const contextValue = useMemo(() => ({
        authState,
        persistLogin,
        logout, AuthError: error
    }), [authState, persistLogin, logout])
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
export const useAuthContext = () => {
    const ctx = useContext(AuthContext)
    if (ctx === null) {
        throw new Error("You are not supposed to access auth context without an ancestor provider for it ")
    }
    return ctx
}