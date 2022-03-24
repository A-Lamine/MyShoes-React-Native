import React, { useContext } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Produits from "../../screens/Produits"
import Settings from "../../screens/settings"
import Panier from "../../screens/Panier"
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons"
import Auth from "../contexts/auth"
import Cart from "../contexts/panier"
import Search from "../../screens/Search"

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    const { isOffline } = useContext(Auth)
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
                    }
                    return <MaterialCommunityIcons name={iconName} color={color} size={size} />
                },
            })}
        >
            {/*             {isOffline ? (
                (alert("Vous êtes hors conexion"),
                (
                    <Tab.Group>
                        <Tab.Screen
                            name="Favories"
                            component={Favories}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons
                                        name="star-outline"
                                        color={color}
                                        size={size}
                                    />
                                ),
                                tabBarLabel: "Mes Favories",
                            }}
                        />
                    </Tab.Group>
                ))
            ) : ( */}

            <Tab.Group>
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Produits" component={Produits} />
                <Tab.Screen
                    name="Panier"
                    component={Panier}
                    options={cart.length > 0 && { tabBarBadge: cart.length }}
                />

                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Group>
            {/*  )} */}
        </Tab.Navigator>
    )
}

export default TabNavigator
