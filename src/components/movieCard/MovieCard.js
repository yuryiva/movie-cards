import React from 'react'
import './MovieCard.css'

export default function MovieCard(props) {
    return (
        <div className='movie-card'>
            {props.plot}
            {props.actors}
        </div>
    )
}

