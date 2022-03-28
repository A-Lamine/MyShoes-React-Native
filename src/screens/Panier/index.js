import React, { useState, useEffect, useContext } from "react"
import Panier from "../../config/contexts/panier"
import { FlatList, Text } from "react-native"
import Fuse from "fuse.js"
import SearchBar from "../../components/search"
import ProductPanier from "../../components/ProductPanier"
import BtnPayer from "../../components/btn"
import { useSwipe } from "../../utils/HOOKS/useSwipe"

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
                    <Text
                        style={{
                            width: "100%",
                            textAlign: "right",
                            padding: 10,
                            fontSize: 17,
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        Total à payer: {price}€
                    </Text>
                    <BtnPayer icon="card-outline" text="Payer" />
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

export default Index
