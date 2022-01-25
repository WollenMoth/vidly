import React from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends React.Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
  ];

  likeColumn = {
    key: "like",
    content: (movie) => (
      <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    ),
  };

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) {
      this.columns[0].content = (movie) => (
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      );
      this.columns.push(this.likeColumn);
      if (user.is_staff) this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
