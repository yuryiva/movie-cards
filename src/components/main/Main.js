import { nanoid } from "nanoid";
import React, { Component } from "react";
import Movie from "../movie/Movie";
import SearchForm from "../searchForm/SearchForm";
import Selector from "../selector/Selector";
import "./Main.css";

export default class Main extends Component {
  state = {
    apiDataReceived: false,
    allMovies: [],
    favouriteMovies: [],
    allGenres: [],
    keyWord: "",
  };

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json"
    )
      .then((dataFromApi) => dataFromApi.json())

      .then((dataFromApi) => {
        this.setState({
          allMovies: dataFromApi.movies,
          allMoviesBackUp: dataFromApi.movies,
          apiDataReceived: true,
          allGenres: ["All", ...dataFromApi.genres],
        });
      });
  }

  addToFav = (exactMovie) => {
    const favouriteMovie = this.state.allMovies[exactMovie];
    const copyOfFavouriteMovies = [...this.state.favouriteMovies];
    copyOfFavouriteMovies.push(favouriteMovie);
    this.setState({
      favouriteMovies: copyOfFavouriteMovies,
    });

    this.state.favouriteMovies.find((movie) => {
      if (movie === favouriteMovie) {
        alert("You have already added this movie as favourite");
        copyOfFavouriteMovies.splice(-1, 1);
      }
      this.setState({
        favouriteMovies: copyOfFavouriteMovies,
      });
    });
  };

  deleteFromFav = (exactMovie) => {
    const copyOfFavouriteMovies = [...this.state.favouriteMovies];
    copyOfFavouriteMovies.splice(exactMovie, 1);
    this.setState({
      favouriteMovies: copyOfFavouriteMovies,
    });
  };

  chooseByGenre = (event) => {
    //filter movies by genre based on event.target.value
    let filteredMovies = this.state.allMoviesBackUp.filter((movie) =>
      movie.genres.includes(event.target.value)
    );
    // check if selected option was 'All'
    let allFilteredMovies =
      event.target.value === "All"
        ? this.state.allMoviesBackUp
        : filteredMovies;
    this.setState({
      allMovies: allFilteredMovies,
    });
  };

  handleInput = (event) => {
    this.setState({
      keyWord: event.target.value,
    });
  };

  handleSearh = (event) => {
    event.preventDefault();
    let filteredMovies = this.state.allMovies.filter(
      (movie) =>
        movie.year.includes(this.state.keyWord) ||
        movie.director.toLowerCase().includes(this.state.keyWord) ||
        movie.plot.toLowerCase().includes(this.state.keyWord) ||
        movie.actors.toLowerCase().includes(this.state.keyWord) ||
        movie.title.toLowerCase().includes(this.state.keyWord)
    );
    this.setState({
      allMovies: filteredMovies,
      keyWord: "",
    });

    // console.log(filteredMovies);
    // if (filteredMovies.length=0){
    //     console.log('filteredMovies=0')}
    //     else{
    //         console.log('filteredMovies>0')
    //     }
    
  };

  render() {
    return (
      <div>
        {this.state.apiDataReceived && (
          <div>
            <div className="list-of-movies">
              {this.state.favouriteMovies.length > 0 &&
                this.state.favouriteMovies.map((movie, index) => (
                  <Movie
                    key={nanoid()}
                    // imgLink={movie.posterUrl}
                    title={movie.title}
                    year={movie.year}
                    director={movie.director}
                    genres={movie.genres.map((genre) => (
                      <span key={nanoid()}>-{genre}</span>
                    ))}
                    exactMovie={index}
                    deleteFromFav={this.deleteFromFav}
                    delete
                  />
                ))}
            </div>

            <hr />

            <Selector
              options={this.state.allGenres.map((genre, index) => (
                <option key={index}>{genre}</option>
              ))}
              chooseByGenre={this.chooseByGenre}
            />
            <SearchForm
              handleInput={this.handleInput}
              handleSearh={this.handleSearh}
            />
            <div className="list-of-movies">
              {this.state.allMovies.map((movie, index) => {
                {
                  /* console.log(movie.posterUrl); */
                }
                return (
                  <Movie
                    key={nanoid()}
                    // imgLink={movie.posterUrl}
                    title={movie.title}
                    year={movie.year}
                    director={movie.director}
                    genres={movie.genres.map((genre) => (
                      <span key={nanoid()}>-{genre}</span>
                    ))}
                    addToFav={this.addToFav}
                    exactMovie={index}
                    add
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
