import React from "react";
import "./MovieCard.css";

export default function MovieCard(props) {
  return (
    <div className="movie-card">
      <h5>THE STORY: </h5>
      {props.plot}
      <h5>ACTORS: </h5>
      {props.actors}
      <br />
      <div className="movie-card-button">
        <button onClick={props.closeDetails}>
          Close
        </button>
      </div>
    </div>
  );
}
