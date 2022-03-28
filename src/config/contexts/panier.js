import React, { useState, createContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showMessage } from "react-native-flash-message"

const Panier = createContext({
    cart: [],
    setCart: () => {},
    addorremove: () => {},
    price: 0,
    setPrice: () => {},
})

export const PanierProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [price, setPrice] = useState(0)
    const [test, setTest] = useState(false)

    useEffect(() => {
        const verfyCart = async () => {
            const Carts = await AsyncStorage.getItem("Panier")
            Carts.length > 0 && setCart(JSON.parse(Carts))
            setTest(true)
        }
        verfyCart()
    }, [])

    useEffect(() => {
        cart &&
            setPrice(
                cart.reduce(
                    (total, currentValue) => (total = total + currentValue.estimatedMarketValue),
                    0,
                ),
            )
    }, [test])

    const addorremove = (item) => {
        const existe = cart.findIndex((element) => element.id === item.id)

        if (existe !== -1) {
            setCart(cart.filter((element) => element.id !== item.id))
            setPrice(price - item.estimatedMarketValue)
            showMessage({
                message: "PRODUIT SUPPRIMÉ DU PANIER",
                type: "danger",
            })
        } else {
            setCart([...cart, item])
            setPrice(price + item.estimatedMarketValue)
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
        price,
        setPrice,
        addorremove,
    }
    return <Panier.Provider value={context}>{children}</Panier.Provider>
}

export default Panier
