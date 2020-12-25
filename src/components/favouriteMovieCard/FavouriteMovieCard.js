import React from 'react'
import './FavouriteMovieCard.css'

export default function FavouriteMovieCard(props) {
    return (
        <div className='movie-card'>
          <h5> FAVOURITE THE STORY: </h5>{props.plot}  
          <h5>ACTORS: </h5>{props.actors}
          <button onClick={props.closeDetails}>Close</button>
        </div>
    )
}

