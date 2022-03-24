import React, { useState, createContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_LOGIN } from "../../config/env"
import axios from "axios"
import NetInfo from "@react-native-community/netinfo"

const Auth = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    login: () => {},
    logout: () => {},
    isOffline: false,
    setIsOffline: () => {},
})

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isOffline, setIsOffline] = useState(false)
    const verfyToken = async () => {
        const token = await AsyncStorage.getItem("token")
        token && setIsLoggedIn(true)
    }

    const login = async (username, password) => {
        axios
            .post(API_LOGIN, {
                username: username,
                password: password,
            })
            .then(function (res) {
                if (res.headers["x-access-token"]) {
                    AsyncStorage.setItem("token", res.headers["x-access-token"]),
                        setIsLoggedIn(true)
                }
            })
    }

    useEffect(() => {
        verfyToken()

        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable)
            setIsOffline(offline)
        })

        return () => removeNetInfoSubscription()
    }, [])

    const logout = async () => {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("Panier")
        setIsLoggedIn(false)
    }

    const context = {
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        isOffline,
        setIsOffline,
    }
    return <Auth.Provider value={context}>{children}</Auth.Provider>
}

export default Auth
