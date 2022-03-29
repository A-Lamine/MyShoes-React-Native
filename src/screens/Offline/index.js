import React from "react"
import styled from "styled-components"
import Offiline_LOGO from "../../../public/no-signal.png"
const Index = () => {
    return (
        <Div>
            <Img source={Offiline_LOGO} />
            <H1>Vous êtes hors ligne</H1>
            <H1>Merci de verifier votre connexion internet</H1>
        </Div>
    )
}

const Div = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #34495e;
    justify-content: center;
`

const Img = styled.Image`
    width: 40%;
    height: 20%;
    border-radius: 20px;
`
const H1 = styled.Text`
    font-size: 20px;
    color: black;
    font-weight: bold;
    padding: 5px;
    text-align: center;
`

export default Index
