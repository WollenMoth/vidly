import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import withRouter from "./common/withRouter";
import auth from "../services/authService";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    id: Joi.number().label("Id"),
    title: Joi.string().required().label("Title"),
    genre: Joi.number().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.navigate("/not-found", { replace: true });
    }
  }

  async componentDidMount() {
    try {
      await this.populateGenres();
      await this.populateMovie();
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        if (await auth.refresh()) return this.componentDidMount();
        window.location = "/login";
      }
    }
  }

  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.navigate("/movies");
  };

  render() {
    const { genres } = this.state;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(MovieForm);
