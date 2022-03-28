import React, { useContext, useState } from "react"
//@ts-ignore
import { CreditCardInput } from "react-native-credit-card-input"
import styled from "styled-components"
import { Dimensions, ActivityIndicator } from "react-native"
import Panier from "../../config/contexts/panier"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { STRIPE_SK, STRIPE_PK } from "../../config/env"

const CURRENCY = "EUR"
let CARD_TOKEN = null

function getCreditCardToken(creditCardData) {
    const card = {
        "card[number]": creditCardData.values.number.replace(/ /g, ""),
        "card[exp_month]": creditCardData.values.expiry.split("/")[0],
        "card[exp_year]": creditCardData.values.expiry.split("/")[1],
        "card[cvc]": creditCardData.values.cvc,
    }
    return fetch("https://api.stripe.com/v1/tokens", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${STRIPE_PK}`,
        },
        method: "post",
        body: Object.keys(card)
            .map((key) => key + "=" + card[key])
            .join("&"),
    })
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
function subscribeUser(creditCardToken) {
    return new Promise((resolve) => {
        CARD_TOKEN = creditCardToken.id
        setTimeout(() => {
            resolve({ status: true })
        }, 1000)
    })
}

const Paiement = ({ navigation }) => {
    const [CardInput, setCardInput] = React.useState({})
    const { price, setCart, setPrice } = useContext(Panier)
    const onSubmit = async () => {
        setWait(true)
        if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
            alert("Invalid Credit Card")
            setWait(false)
            return false
        }

        let creditCardToken
        try {
            creditCardToken = await getCreditCardToken(CardInput)

            if (creditCardToken.error) {
                alert("creditCardToken error")
                setWait(false)
                return
            }
        } catch (e) {
            console.log("e", e)
            setWait(false)
            return
        }
        const { error } = await subscribeUser(creditCardToken)
        if (error) {
            alert(error)
            setWait(false)
        } else {
            let pament_data = await charges()
            if (pament_data.status == "succeeded") {
                await AsyncStorage.removeItem("Panier")
                setCart([])
                setPrice(0)
                alert("Payment Successfully")
                setWait(false)
                navigation.navigate("Produits")
            } else {
                alert("Payment failed")
                setWait(false)
            }
        }
    }

    const [wait, setWait] = useState(false)
    const charges = async () => {
        const card = {
            amount: price * 100,
            currency: CURRENCY,
            source: CARD_TOKEN,
            description: "MyShoes_Market",
        }

        return fetch("https://api.stripe.com/v1/charges", {
            headers: {
                Accept: "application/json",

                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${STRIPE_SK}`,
            },

            method: "post",

            body: Object.keys(card)
                .map((key) => key + "=" + card[key])
                .join("&"),
        }).then((response) => response.json())
    }

    const _onChange = (data) => {
        setCardInput(data)
    }
    const { height } = Dimensions.get("window")

    return (
        <>
            <CreditCardInput onChange={_onChange} />
            <Div>
                <P color="black">Total à payer : {price}€</P>
            </Div>
            {wait ? (
                <ActivityIndicator size={30} style={{ padding: 20 }} />
            ) : (
                <Button height={height / 12 + "px"} onPress={onSubmit}>
                    <P color="white">Payer</P>
                </Button>
            )}
        </>
    )
}

const Button = styled.TouchableOpacity`
    background-color: #2471a3;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.height};
    margin-top: 4%;
`
const Div = styled.View`
    width: 100%;
    margin-top: 4%;
    display: flex;
    align-items: flex-end;
    padding: 10px;
`

const P = styled.Text`
    color: ${(props) => props.color};
    font-size: 20px;
    font-weight: bold;
`

export default Paiement
