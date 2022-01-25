import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import auth from "../services/authService";
import { getMovies, deleteMovie, likeMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";

class Movies extends React.Component {
  allGenres = { id: null, name: "All Genres" };

  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: this.allGenres,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    try {
      const { data: genres } = await getGenres();
      genres.unshift(this.allGenres);
      const { data: movies } = await getMovies();
      this.setState({ movies, genres });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        if (await auth.refresh()) return this.componentDidMount();
        window.location = "/login";
      }
    }
  }

  handleDelete = async (movie) => {
    const {
      movies: originalMovies,
      currentPage: originalPage,
      pageSize,
    } = this.state;

    const movies = originalMovies.filter((m) => m.id !== movie.id);
    const count = paginate(movies, originalPage, pageSize).length;
    if (count) this.setState({ movies });
    else this.setState({ movies, currentPage: originalPage - 1 });

    try {
      await deleteMovie(movie.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies, currentPage: originalPage });
    }
  };

  handleLike = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });

    try {
      await likeMovie(movie);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This post has already been deleted");

      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery,
      selectedGenre: this.allGenres,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre.id)
      filtered = allMovies.filter((m) => m.genre.id === selectedGenre.id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      selectedGenre,
      genres,
    } = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-lg-2 mb-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
