import React from "react"
import styled from "styled-components"
import IonIcon from "react-native-vector-icons/Ionicons"
IonIcon.loadFont()

const Input = (props) => {
    return (
        <Div>
            <IonIcon name={props.icon} size={25} color="#7f8c8d" />
            <Inputstyle
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secu}
                name={props.name}
                value={props.value}
            />
        </Div>
    )
}

const Inputstyle = styled.TextInput`
    width: 100%;
    height: 100%;
    color: #7f8c8d;
`
const Div = styled.View`
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    padding-top: 0.3%;
    padding-bottom: 0.3%;
    padding-left: 3%;
    padding-right: 3%;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 10px;
    border: 1px black;
`

export default Input
