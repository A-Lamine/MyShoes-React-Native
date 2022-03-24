import React from "react"
import styled from "styled-components"

function Index({ item }) {
    return (
        <Div>
            <H1>{item}</H1>
        </Div>
    )
}

const Div = styled.View`
    display: flex;
    border: 1px solid #b3b6b7;
    align-items: center;
    padding: 1px;
    width: auto;
    border-radius: 10px;
    padding: 10px;
    margin-right: 5px;
`
const H1 = styled.Text`
    color: black;
    font-size: 15px;
`

export default Index
