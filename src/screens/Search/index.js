import React, { useState, useEffect, useContext } from "react"
import { FlatList, View, ActivityIndicator, TouchableOpacity } from "react-native"
import axios from "axios"
import SearchBar from "../../components/search"
import BtnSerch from "../../components/btn"
import { useSwipe } from "../../utils/HOOKS/useSwipe"
import { HOST, KEY } from "../../config/env"
import ProductCard from "../../components/ProductCard"

function Index({ navigation }) {
    const [query, setQuery] = useState("")
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight)

    function onSwipeRight() {
        navigation.navigate("Produits")
    }
    function onSwipeLeft() {
        navigation.navigate("Settings")
    }

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [inSearch, setInSearch] = useState(false)

    const options = {
        method: "GET",
        url: "https://the-sneaker-database.p.rapidapi.com/search",
        params: { limit: "20", page: offset, query: query },
        headers: {
            "x-rapidapi-host": HOST,
            "x-rapidapi-key": KEY,
        },
    }

    const MySearch = () => {
        setData([])
        inSearch ? setInSearch(false) : setInSearch(true)
    }

    useEffect(() => {
        setLoading(true)
        axios.request(options).then(function (response) {
            console.log("jy rsuis")
            setData([...data, ...response.data.results])
            setLoading(false)
        })
    }, [offset, inSearch])

    const renderItem = ({ item }) => (
        <>
            <TouchableOpacity onPress={() => navigation.navigate("Details", { id: item.id })}>
                <ProductCard item={item} />
            </TouchableOpacity>
        </>
    )

    const renderFooter = () => loading && <ActivityIndicator size={30} style={{ padding: 20 }} />
    return (
        <>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "80%" }}>
                    <SearchBar customSearch={query} setCustomSearch={setQuery} />
                </View>
                <BtnSerch action={MySearch} icon="search-outline" text="Chercher" />
            </View>
            <FlatList
                style={{ backgroundColor: "white" }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, i) => item.id + i}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                onEndReached={() => setOffset(offset + 20)}
                ListFooterComponent={renderFooter}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            />
        </>
    )
}

export default Index
