import React from 'react'

export default function Selector(props) {
    return (
        <select onChange={props.chooseByGenre}>
            {props.options}
        </select>
    )
}
