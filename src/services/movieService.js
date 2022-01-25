import http from "./httpService";

const apiEndpoint = "/api/movies/";

function movieUrl(id) {
  return `${apiEndpoint}${id}/`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  return movie.id
    ? http.put(movieUrl(movie.id), movie)
    : http.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}

export async function likeMovie(movie) {
  return http.patch(movieUrl(movie.id), {
    liked: !movie.liked,
  });
}
