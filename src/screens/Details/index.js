import React, { useState, useEffect } from "react"
import axios from "axios"
import DetailsCard from "../../components/ProductInfo"
import { API_SNEAKER, HOST, KEY } from "../../config/env"
import { ActivityIndicator } from "react-native"

function Index({ route, navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const options = {
        method: "GET",
        url: `${API_SNEAKER}/${route.params.id}`,
        headers: {
            "x-rapidapi-host": HOST,
            "x-rapidapi-key": KEY,
        },
    }
    useEffect(() => {
        axios.request(options).then(function (response) {
            setData(response.data.results[0])
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading && <ActivityIndicator />}
            <DetailsCard item={data} navigation={navigation} />
        </>
    )
}

export default Index
