import React from "react"
import styled from "styled-components"
import { Dimensions } from "react-native"

function Index({
    item: {
        name,
        image: { thumbnail },
    },
}) {
    const { width, height } = Dimensions.get("window")
    const mywidth = `${width / 2}px`
    return (
        <Div size={mywidth}>
            {thumbnail ? (
                <Img source={{ uri: `${thumbnail}` }} />
            ) : (
                <Img source={require("../../../public/giphy.gif")} />
            )}
            <H1>{name}</H1>
        </Div>
    )
}

const Div = styled.View`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.size};
    height: 250px;
    align-items: center;
    padding: 5%;
`
const Img = styled.Image`
    width: 100%;
    height: 50%;
`
const H1 = styled.Text`
    color: black;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
`

export default Index
