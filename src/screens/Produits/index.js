import axios from "axios"
import React, { useState, useEffect } from "react"
import { FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import ProductCard from "../../components/ProductCard"
import { API_SNEAKER, HOST, KEY, API_FILTRE } from "../../config/env"
import { useSwipe } from "../../utils/HOOKS/useSwipe"
import MesCatalogue from "../../components/MesCatalogues"

function Produits({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [data2, setData2] = useState()
    const [loading2, setLoading2] = useState(true)
    const [brand, setBrand] = useState({})
    const [active, setActive] = useState(false)
    const [offset, setOffset] = useState(0)
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight)
    const [params, setParams] = useState({ limit: "20", page: offset })

    useEffect(() => {
        if (active) {
            active && setData([])
            setParams({ ...params, brand })
        }
    }, [brand])

    function onSwipeRight() {}
    function onSwipeLeft() {
        navigation.navigate("Search")
    }

    const options = {
        method: "GET",
        url: API_SNEAKER,
        params,
        headers: {
            "x-rapidapi-host": HOST,
            "x-rapidapi-key": KEY,
        },
    }

    const options2 = {
        method: "GET",
        url: API_FILTRE,
        headers: {
            "x-rapidapi-host": HOST,
            "x-rapidapi-key": KEY,
        },
    }

    useEffect(() => {
        axios.request(options2).then(function (response) {
            setData2(response.data.results)
            setLoading2(false)
        })
    }, [])

    const ChangeCategorie = async ({ item }) => {
        setActive(true)
        setBrand(item)
    }

    const renderItem2 = ({ item }) => (
        <>
            <TouchableOpacity onPress={() => ChangeCategorie({ item })}>
                <MesCatalogue item={item} />
            </TouchableOpacity>
        </>
    )

    const renderFooter2 = () => loading2 && <ActivityIndicator size={30} style={{ padding: 20 }} />

    useEffect(() => {
        setLoading(true)
        axios.request(options).then(function (response) {
            setData([...data, ...response.data.results])
            setLoading(false)
        })
    }, [params])

    const renderItem = ({ item }) => (
        <>
            <TouchableOpacity onPress={() => navigation.navigate("Details", { id: item.id })}>
                <ProductCard item={item} />
            </TouchableOpacity>
        </>
    )

    const renderFooter = () => loading && <ActivityIndicator size={30} style={{ padding: 20 }} />

    useEffect(() => {
        setParams({ ...params, page: offset })
    }, [offset])
    return (
        <>
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                style={{ backgroundColor: "white" }}
                data={data2}
                horizontal
                renderItem={renderItem2}
                keyExtractor={(item, i) => i}
                ListFooterComponent={renderFooter2}
                showsHorizontalScrollIndicator={false}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            />
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

export default Produits
