import React, { useState, useContext } from "react"
import styled from "styled-components"
import Panier from "../../config/contexts/panier"
import { Dimensions } from "react-native"
import { useSwipe } from "../../utils/HOOKS/useSwipe"
import { showMessage } from "react-native-flash-message"

function Index({ item }) {
    const {
        name,
        image: { thumbnail },
        brand,
        estimatedMarketValue,
    } = item
    const { addorremove } = useContext(Panier)
    const { width } = Dimensions.get("window")
    const mywidth = `${width}px`
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight)
    function onSwipeLeft() {
        addorremove(item)
    }

    function onSwipeRight() {
        addorremove(item)
    }

    function QtyAdd() {
        qty < 5
            ? setQty(qty + 1)
            : showMessage({
                  message: "VOUS AVEZ ATTEINT LA QUANTITÉ MAXIMUM POUR CE PRODUIT",
                  type: "warning",
              })
    }

    function Qtyremove() {
        qty > 1 ? setQty(qty - 1) : addorremove(item)
    }

    const [qty, setQty] = useState(1)
    return (
        <Div
            direction="row"
            width={mywidth}
            height="90px"
            items="center"
            justify="flex-start"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {thumbnail ? (
                <Img source={{ uri: `${thumbnail}` }} />
            ) : (
                <Img source={require("../../../public/giphy.gif")} />
            )}
            <Div
                direction="column"
                width="50%"
                height="100%"
                items="flex-start"
                justify="space-around"
            >
                <H1 weight="bold">{brand}</H1>
                <H1 weight="normal">{name}</H1>
                <P>{estimatedMarketValue} €</P>
            </Div>
            <Div direction="column" width="20%" height="100%" items="center" justify="space-around">
                <BtnQty background="green" onPress={QtyAdd}>
                    <H1 weight="normal">+</H1>
                </BtnQty>
                <P>{qty}</P>
                <BtnQty background="red" onPress={Qtyremove}>
                    <H1 weight="normal">-</H1>
                </BtnQty>
            </Div>
        </Div>
    )
}

const Div = styled.View`
    display: flex;
    flex-direction: ${(props) => props.direction};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    align-items: ${(props) => props.items};
    justify-content: ${(props) => props.justify};
`
const H1 = styled.Text`
    font-size: 15px;
    font-weight: ${(props) => props.weight};
    color: black;
`
const P = styled.Text`
    font-size: 13px;
    font-weight: bold;
    font-style: italic;
    color: grey;
`
const Img = styled.Image`
    width: 30%;
    height: 100%;
`
const BtnQty = styled.TouchableOpacity`
    background-color: ${(props) => props.background};
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 30%;
    border-radius: 10px;
`
export default Index
