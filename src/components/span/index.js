import React from "react"
import styled from "styled-components"

function Index(props) {
    return (
        <Span>
            <H1>{props.H1}</H1>
            <P>{props.P}</P>
        </Span>
    )
}

const Span = styled.View`
    display: flex;
    flex-direction: row;
    padding: 10px;
`
const H1 = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: black;
`
const P = styled.Text`
    font-size: 15px;
    font-weight: bold;
    display: flex;
    width: 70%;
`
export default Index
