import React from "react"
import styled from "styled-components"
import Inputstyle from "../input"

function Index({ customSearch, setCustomSearch, onSubmitEditing }) {
    return (
        <Div>
            <Inputstyle
                icon="search-outline"
                placeholder="Search"
                value={customSearch}
                onChangeText={(e) => setCustomSearch(e)}
                onSubmitEditing={() => onSubmitEditing()}
            />
        </Div>
    )
}

const Div = styled.View`
    width: 100%;
    height: 50px;
    margin: auto;
    flex-direction: row;
    background-color: white;
`

export default Index
