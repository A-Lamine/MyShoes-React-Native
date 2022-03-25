import React, { useContext } from "react"
import Logoutbtn from "../../components/btn"
import styled from "styled-components"
import Auth from "../../config/contexts/auth"
import { useSwipe } from "../../utils/HOOKS/useSwipe"

const Index = ({ navigation }) => {
    const { logout } = useContext(Auth)
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight)

    function onSwipeRight() {
        navigation.navigate("Panier")
    }
    function onSwipeLeft() {}

    return (
        <Div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Logoutbtn action={logout} text="Se Déconnecter" icon="log-out" />
        </Div>
    )
}

const Div = styled.View`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    text-align: center;
    justify-content: center;
`
export default Index
