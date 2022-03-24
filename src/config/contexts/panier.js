import React, { useState, createContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showMessage } from "react-native-flash-message"

const Panier = createContext({
    cart: [],
    setCart: () => {},
    addorremove: () => {},
})

export const PanierProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const verfyCart = async () => {
        const Carts = await AsyncStorage.getItem("Panier")
        Carts && setCart(JSON.parse(Carts))
    }

    useEffect(() => {
        verfyCart()
    }, [])

    const addorremove = (item) => {
        const existe = cart.findIndex((element) => element.id === item.id)

        if (existe !== -1) {
            setCart(cart.filter((element) => element.id !== item.id))
            showMessage({
                message: "PRODUIT SUPPRIMÉ DU PANIER",
                type: "danger",
            })
        } else {
            setCart([...cart, item])
            showMessage({
                message: "PRODUIT AJOUTÉ AU PANIER",
                type: "success",
            })
        }
    }
    useEffect(() => {
        AsyncStorage.setItem("Panier", JSON.stringify(cart))
    }, [cart])

    const context = {
        cart,
        setCart,
        addorremove,
    }
    return <Panier.Provider value={context}>{children}</Panier.Provider>
}

export default Panier
