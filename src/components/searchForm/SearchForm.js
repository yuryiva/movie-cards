import React from 'react'

export default function SearchForm(props) {
    return (
        <form onSubmit={props.handleSearh}>
        <label>
           FIND A MOVIE BY YEAR 
        </label>
        <input onChange={(e)=>props.handleInput(e)} placeholder='type here' type='search' pattern="(.|\s)*\S(.|\s)*" required/>
            <button>SEARCH</button>
        </form>
    )
}
