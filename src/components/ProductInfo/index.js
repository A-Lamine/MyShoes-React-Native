import React, { useContext } from "react"
import styled from "styled-components"
import BtnaddOrremove from "../btn"
import Panier from "../../config/contexts/panier"
import Spanv from "../span"

function Index({ item, navigation }) {
    const { id, name, image, brand, colorway, estimatedMarketValue, gender } = item
    const img = image ? true : false
    const { addorremove, cart } = useContext(Panier)

    const inCart = cart.filter((cartItem) => cartItem.id === id)

    return (
        <Div>
            {img && image.thumbnail ? (
                <Img source={{ uri: `${image.thumbnail}` }} />
            ) : (
                <Img source={require("../../../public/giphy.gif")} />
            )}
            <Div>
                <Spanv H1={`Chaussure pour ${gender}`} />
                <Spanv H1="Marque : " P={brand} />
                <Spanv H1="Nom : " P={name} />
                <Spanv H1="Prix : " P={`${estimatedMarketValue} €`} />
                <Spanv H1="Couleur : " P={colorway} />

                {inCart.length !== 0 ? (
                    <BtnaddOrremove
                        action={() => navigation.navigate("Panier")}
                        text="Voir le panier"
                        icon="basket"
                    />
                ) : (
                    <BtnaddOrremove
                        action={() => addorremove(item)}
                        text="Ajouter au panier"
                        icon="basket"
                    />
                )}
            </Div>
        </Div>
    )
}
const Img = styled.Image`
    width: 100%;
    height: 350px;
`
const Div = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: white;
`
export default Index
