import React, { useContext } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../../screens/login"
import TabNavigator from "./tab"
import Auth from "../contexts/auth"
import Details from "../../screens/Details"
import { StatusBar, useColorScheme } from "react-native"
import Paiement from "../../screens/Paiement"

const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    const isDarkMode = useColorScheme() === "dark"

    const { isLoggedIn } = useContext(Auth)
    return (
        <>
            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                backgroundColor={isLoggedIn ? "white" : "#34495E"}
            />
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Group>
                        <Stack.Screen
                            name="TabNavigator"
                            component={TabNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen name="Details" component={Details} />
                        <Stack.Screen name="Paiement" component={Paiement} />
                    </Stack.Group>
                ) : (
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                )}
            </Stack.Navigator>
        </>
    )
}
export default StackNavigator
