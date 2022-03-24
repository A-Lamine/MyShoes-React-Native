import axios from "axios"
import React, { useState, useEffect } from "react"
import { FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import ProductCard from "../../components/ProductCard"
import { API_SNEAKER, HOST, KEY } from "../../config/env"
import { useSwipe } from "../../utils/HOOKS/useSwipe"
import MesCatalogue from "../../components/MesCatalogues"

function Produits({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [data2, setData2] = useState()
    const [loading2, setLoading2] = useState(true)
    const [brand, setBrand] = useState({})

    const [offset, setOffset] = useState(0)
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight)
    const [params, setParams] = useState({ limit: "20", page: offset })

    useEffect(() => {
        setData([])
        setParams({ ...params, brand })
    }, [brand])

    function onSwipeRight() {}
    function onSwipeLeft() {
        navigation.navigate("Panier")
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
        url: "https://the-sneaker-database.p.rapidapi.com/brands",
        headers: {
            "x-rapidapi-host": HOST,
            "x-rapidapi-key": KEY,
        },
    }

    useEffect(() => {
        console.log("two")
        axios.request(options2).then(function (response) {
            setData2(response.data.results)
            setLoading2(false)
        })
    }, [])

    const ChangeCategorie = async ({ item }) => {
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
        console.log("one")
        setLoading(true)
        axios.request(options).then(function (response) {
            setData([...data, ...response.data.results])
            setLoading(false)
        })
    }, [offset, params])

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
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                style={{ backgroundColor: "white" }}
                data={data2}
                horizontal
                renderItem={renderItem2}
                keyExtractor={(item, i) => i}
                ListFooterComponent={renderFooter2}
                showsHorizontalScrollIndicator={false}
            />
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

export default Produits
