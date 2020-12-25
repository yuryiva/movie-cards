import { nanoid } from "nanoid";
import React, { Component } from "react";
import FavouriteMovieCard from "../favouriteMovieCard/FavouriteMovieCard";
import Movie from "../movie/Movie";
import MovieCard from "../movieCard/MovieCard";
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
    randomMovie: {},
    showFavouriteMovieCard: false,
    showMovieCard: false,
    detailsOfMovieToShow: {},
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
      detailsOfMovieToShow: {},
      showMovieCard: false,
      showFavouriteMovieCard: false,
      favouriteMovies: copyOfFavouriteMovies,
    });

    this.state.favouriteMovies.find((movie) => {
      if (movie === favouriteMovie) {
        alert("You have already added this movie as favourite");
        copyOfFavouriteMovies.splice(-1, 1);
      }
      this.setState({
        favouriteMovies: copyOfFavouriteMovies,
        detailsOfMovieToShow: {},
        showMovieCard: false,
        showFavouriteMovieCard: false,
      });
    });
  };

  deleteFromFav = (exactMovie) => {
    const copyOfFavouriteMovies = [...this.state.favouriteMovies];
    copyOfFavouriteMovies.splice(exactMovie, 1);
    this.setState({
      favouriteMovies: copyOfFavouriteMovies,
      showMovieCard: false,
      showFavouriteMovieCard: false,
      detailsOfMovieToShow: {},
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

    if (filteredMovies.length === 0) {
      alert("NO MOVIES FOUND. ALL MOVIES WILL BE REDISPLAYED");
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
  };

  getRandomMovie = () => {
    const randomMovieIndex = Math.floor(
      Math.random() * this.state.favouriteMovies.length
    );
    const newRandomMovie = this.state.favouriteMovies[randomMovieIndex];
    this.setState(
      {
        randomMovie: newRandomMovie,
      },
      () => {
        this.props.history.push({
          pathname: "/random",
          state: {
            randomMovie: this.state.randomMovie,
            
    detailsOfMovieToShow: this.state.detailsOfMovieToShow,
          },
        });
      }
    );
  };

  showDetails = (exactMovie) => {
    const movieToShow = this.state.allMovies[exactMovie];
    if (
      this.state.favouriteMovies.includes(movieToShow) &&
      this.state.allMovies.includes(movieToShow)
    ) {
      this.setState({
        showFavouriteMovieCard: true,
        showMovieCard: false,
        detailsOfMovieToShow: movieToShow,
      });
    }

    if (this.state.allMovies.includes(movieToShow)) {
      this.setState({
        showFavouriteMovieCard: false,
        showMovieCard: true,
        detailsOfMovieToShow: movieToShow,
      });
    }
  };

  closeDetails = () => {
    this.setState({
      showFavouriteMovieCard: false,
      showMovieCard: false,
      detailsOfMovieToShow: {},
    });
  };

  render() {
    return (
      <div>
        {this.state.apiDataReceived && (
          <div>
            <div>
              {this.state.favouriteMovies.length > 0 && (
                <div>
                  <h3>
                    PICK RANDOM FAVOURITE MOVIE
                    <button onClick={this.getRandomMovie}>PICK</button>
                  </h3>
                  {/* {this.state.showFavouriteMovieCard && (
                    <FavouriteMovieCard
                      plot={this.state.detailsOfMovieToShow.plot}
                      actors={this.state.detailsOfMovieToShow.actors}
                      closeDetails={this.closeDetails}
                    />
                  )} */}
                  <div className="list-of-movies">
                    {this.state.favouriteMovies.map((movie, index) => (
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
                        showDetails={this.showDetails}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <hr />
            <div className="selector-and-search">
              <Selector
                options={this.state.allGenres.map((genre, index) => (
                  <option key={index}>{genre}</option>
                ))}
                chooseByGenre={this.chooseByGenre}
              />
              <SearchForm
                handleInput={this.handleInput}
                handleSearh={this.handleSearh}
                input={this.resetInput}
              />
            </div>
            {this.state.showMovieCard && (
              <MovieCard
                plot={this.state.detailsOfMovieToShow.plot}
                actors={this.state.detailsOfMovieToShow.actors}
                closeDetails={this.closeDetails}
              />
            )}
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
                    showDetails={this.showDetails}
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
