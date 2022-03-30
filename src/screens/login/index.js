import React, { useState, useContext } from "react"
import { ActivityIndicator } from "react-native"
import styled from "styled-components"
import Input from "../../components/input"
import Auth from "../../config/contexts/auth"
import MyShoes_LOGO from "../../../public/images.jpg"
import IonIcon from "react-native-vector-icons/Ionicons"
IonIcon.loadFont()

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" })
    const { login } = useContext(Auth)
    const [loading, setLoading] = useState(false)
    const [userEror, setUserEror] = useState(false)
    const [passwordEror, setPasswordEror] = useState(false)

    const Connexion = () => {
        setLoading(true)
        if (user.email.length < 3) {
            setPasswordEror(false)
            setUserEror(true)
            alert("Le UserName doit contenir au minimum 3 caractères")
            setLoading(false)
        } else if (user.password.length < 8) {
            setPasswordEror(true)
            setUserEror(false)
            alert("Le Mot de Passe doit contenir au minimum 8 caractères")
            setLoading(false)
        } else {
            login(user.email, user.password)
        }
    }

    return (
        <>
            <Div>
                <Img source={MyShoes_LOGO} />
                <Div2>
                    <H1 size="30px" color="white" weight="bold" bottom="0px">
                        Login
                    </H1>

                    <Input
                        icon="person"
                        secu={false}
                        placeholder="Email"
                        onChangeText={(email) => setUser({ ...user, email })}
                        name="email"
                    />

                    {userEror ? (
                        <H1 size="10px" color="#f4d03f" weight="normal" bottom="1%">
                            Le UserName doit contenir au minimum 3 caractères
                        </H1>
                    ) : null}
                    <Input
                        icon="key"
                        secu={true}
                        placeholder="Password"
                        onChangeText={(password) => setUser({ ...user, password })}
                        name="password"
                    />
                    {passwordEror ? (
                        <H1 size="10px" color="#f4d03f" weight="normal" bottom="1%">
                            NB : Le Mot de Passe doit contenir au minimum 8 caractères
                        </H1>
                    ) : null}

                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Btn onPress={() => Connexion()}>
                            <IonIcon name="log-in-outline" size={20} color="white" weight="bold" />
                            <H1 size="20px" color="white" weight="bold" bottom="0px">
                                Connexion
                            </H1>
                        </Btn>
                    )}
                </Div2>
            </Div>
        </>
    )
}

const Div = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #34495e;
    padding: 10px;
`
const Div2 = styled.View`
    width: 100%;
    height: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
`
const Img = styled.Image`
    width: 40%;
    height: 20%;
    border-radius: 20px;
    margin-top: 10%;
`
const H1 = styled.Text`
    font-size: ${(props) => props.size};
    color: ${(props) => props.color};
    font-weight: ${(props) => props.weight};
    margin-bottom: ${(props) => props.bottom};
    padding: 10px;
`
const Btn = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #cb4335;
    border-radius: 20px;
    width: 45%;
    height: 55px;
    margin-top: 10px;
    padding-left: 2%;
`

export default Login
