import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from "./src/config/routes/StackNavigator"
import { AuthProvider } from "./src/config/contexts/auth"
import { PanierProvider } from "./src/config/contexts/panier"
import FlashMessage from "react-native-flash-message"

const App = () => {
    return (
        <AuthProvider>
            <PanierProvider>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </PanierProvider>
            <FlashMessage position="top" />
        </AuthProvider>
    )
}

export default App
