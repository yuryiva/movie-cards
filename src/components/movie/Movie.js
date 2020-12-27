import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

const Movie = (props) => {
  let myProps = props.location //if there is smth. in props.location (which is .....'/random') , then you receive props from props.location.state.randomMovie
    ? props.location.state.randomMovie
    : props; // if there is nothing in props.location, it means you're at '/' and receiving normal props

  return (
    <div className="movie-container">
      <div className="image-container">
        <img src={myProps.imgLink} alt={myProps.title} />
      </div>
      <div className="text-and-button-container">
        <div className="text-container">
          <h2>{myProps.title}</h2>
          <h3>{myProps.year}</h3>
          <h3>DIRECTED BY: {myProps.director}</h3>
          <h4>GENRES: {myProps.genres};</h4>
        </div>

        <div className="button-container">
          {myProps.add && (
            <button onClick={() => myProps.addToFav(myProps.exactMovie)}>
              Add to favourites
            </button>
          )}

          {myProps.delete && (
            <button onClick={() => myProps.deleteFromFav(myProps.exactMovie)}>
              Remove from favourites
            </button>
          )}
          <button onClick={() => myProps.showDetails(myProps.exactMovie)}>
            Details
          </button>

          {props.location && (
            <Link to="/">
              <button>Back</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
