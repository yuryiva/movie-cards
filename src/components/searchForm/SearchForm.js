import React from "react";
import './SearchForm.css'

export default function SearchForm(props) {
  return (
    <form onSubmit={props.handleSearh}>
      <label>FIND A MOVIE BY KEYWORD</label>
      <input
        onChange={(e) => props.handleInput(e)}
        placeholder="type here"
        type="search"
        pattern="(.|\s)*\S(.|\s)*"
        required
      >{props.input}</input>
      <button>SEARCH</button>
    </form>
  );
}
