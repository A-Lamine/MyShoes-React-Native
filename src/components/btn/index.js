import React, { useContext } from "react"
import styled from "styled-components"
import Icon from "react-native-vector-icons/Ionicons"

const Index = (props) => {
    return (
        <Btn onPress={props.action}>
            <Icon name={props.icon} size={20} color="white" />
            <H1>{props.text}</H1>
        </Btn>
    )
}

const Btn = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    background-color: #34495e;
    width: 45%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    justify-content: center;
`
const H1 = styled.Text`
    font-size: 15px;
    color: white;
    font-weight: bold;
    margin-left: 5px;
`

export default Index
