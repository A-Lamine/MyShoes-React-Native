import React, { useState, useEffect } from "react"
import { FlatList, View, ActivityIndicator, TouchableOpacity } from "react-native"
import axios from "axios"
import SearchBar from "../../components/search"
import { useSwipe } from "../../utils/HOOKS/useSwipe"
import { HOST, KEY, API_SEARCH } from "../../config/env"
import ProductCard from "../../components/ProductCard"

function Index({ navigation }) {
    const [query, setQuery] = useState("")
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight)

    function onSwipeRight() {
        navigation.navigate("Produits")
    }
    function onSwipeLeft() {
        navigation.navigate("Panier")
    }

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [inSearch, setInSearch] = useState(false)

    const options = {
        method: "GET",
        url: API_SEARCH,
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
            <SearchBar customSearch={query} setCustomSearch={setQuery} onSubmitEditing={MySearch} />

            <FlatList
                style={{ backgroundColor: "white" }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, i) => item.id + i}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                onEndReached={() => setOffset(offset + 1)}
                ListFooterComponent={renderFooter}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            />
        </>
    )
}

export default Index
