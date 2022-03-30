import React, { useState, useEffect, useContext } from "react"
import Panier from "../../config/contexts/panier"
import { FlatList, Text } from "react-native"
import Fuse from "fuse.js"
import SearchBar from "../../components/search"
import ProductPanier from "../../components/ProductPanier"
import BtnPayer from "../../components/btn"
import { useSwipe } from "../../utils/HOOKS/useSwipe"
import styled from "styled-components"

function Index({ navigation }) {
    const { cart, price } = useContext(Panier)
    const [customSearch, setCustomSearch] = useState("")
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight)

    function onSwipeRight() {
        navigation.navigate("Search")
    }
    function onSwipeLeft() {
        navigation.navigate("Settings")
    }

    const renderItem = ({ item }) => (
        <>
            {customSearch.length > 2 ? (
                <ProductPanier item={item.item} />
            ) : (
                <ProductPanier item={item} />
            )}
        </>
    )
    const renderFooter = () => (
        <>
            {cart.length > 0 && (
                <>
                    <P>Total à payer: {price}€</P>
                    <BtnPayer
                        action={() => navigation.navigate("Paiement")}
                        icon="card-outline"
                        text="Payer"
                    />
                </>
            )}
        </>
    )
    const options = {
        includeScore: true,
        keys: ["name", "brand"],
    }
    const fuse = new Fuse(cart, options)

    const fuseSearch = fuse.search(customSearch)
    function onSubmitEditing() {}
    return (
        <>
            <SearchBar
                customSearch={customSearch}
                setCustomSearch={setCustomSearch}
                onSubmitEditing={onSubmitEditing}
            />
            {customSearch.length > 2 ? (
                <FlatList
                    data={fuseSearch}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.item.id}
                    showsHorizontalScrollIndicator={false}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                />
            ) : (
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    contentContainerStyle={{ marginTop: 10, marginBottom: 20 }}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={renderFooter}
                    ListFooterComponentStyle={{ marginTop: 20 }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                />
            )}
        </>
    )
}

const P = styled.Text`
    width: 100%;
    text-align: right;
    padding: 7%;
    font-size: 17px;
    font-weight: bold;
    color: black;
`

export default Index
