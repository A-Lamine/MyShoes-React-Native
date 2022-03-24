import React from "react"
import styled from "styled-components"
import Inputstyle from "../input"

function Index({ customSearch, setCustomSearch }) {
    return (
        <Div>
            <Inputstyle
                icon="search-outline"
                placeholder="Search"
                value={customSearch}
                onChangeText={(e) => setCustomSearch(e)}
            />
        </Div>
    )
}

const Div = styled.View`
    width: 100%;
    height: 50px;
    margin: auto;
    flex-direction: row;
`

export default Index
