import React, { useContext } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Produits from "../../screens/Produits"
import Settings from "../../screens/settings"
import Panier from "../../screens/Panier"
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons"
import Cart from "../contexts/panier"
import Search from "../../screens/Search"

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    const { cart } = useContext(Cart)

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === "Panier") {
                        iconName = focused ? "cart" : "cart-outline"
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline"
                    } else if (route.name === "Produits") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline"
                    }
                    return <MaterialCommunityIcons name={iconName} color={color} size={size} />
                },
            })}
        >
            <Tab.Group>
                <Tab.Screen name="Produits" component={Produits} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen
                    name="Panier"
                    component={Panier}
                    options={cart.length > 0 && { tabBarBadge: cart.length }}
                />

                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Group>
        </Tab.Navigator>
    )
}

export default TabNavigator
