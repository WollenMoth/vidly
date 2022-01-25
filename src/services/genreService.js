import http from "./httpService";

const apiEndpoint = "/api/genres/";

export function getGenres() {
  return http.get(apiEndpoint);
}
