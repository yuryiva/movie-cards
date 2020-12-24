import React from "react";
import "./Movie.css";

const Movie = (props) => {
  return (
    <div className="movie-container">
      <div className="image-container">
        <img src={props.imgLink} alt={props.title} />
      </div>
      <div className="text-and-button-container">
      <div className='text-container'>
        <h2>{props.title}</h2>
        <h3>{props.year}</h3>
        <h3>DIRECTED BY: {props.director}</h3>
        <h4>GENRES: {props.genres};</h4>
        </div>
        
        <div className='button-container'>
        {props.add && (
          <button onClick={() => props.addToFav(props.exactMovie)}>
            Add to favourites
          </button>
        )}

        {props.delete && (
          <button onClick={() => props.deleteFromFav(props.exactMovie)}>
            Delete from favourites
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
