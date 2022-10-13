import validator from "validator";
import {getFullUrl} from "./MoviesUtils";

class MoviesApi {
    constructor(url) {
        this._url = url;
        this._headers = {
            'Content-Type': 'application/json',
        };
    }

    loadMovies() {
        return fetch(this._url, {
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res))
            .then((movies) => {
                return movies
                    .filter((movie) => movie.id && validator.isURL(movie.trailerLink))
                    .filter((movie) => {
                        const url = movie.image?.url;
                        return url && validator.isURL(getFullUrl(url));
                    })
                    .filter((movie) => {
                        const url = movie.image?.formats?.thumbnail?.url;
                        return url && validator.isURL(getFullUrl(url));
                    })
                    .map((movie) => {
                        const {
                            country = '',
                            director = '',
                            duration = 0,
                            year = '',
                            description = '',
                            nameRU = '',
                            nameEN = 'none',
                        } = movie;

                        return {
                            movieId: movie.id,
                            image: getFullUrl(movie.image.url),
                            country,
                            director,
                            duration,
                            year,
                            description,
                            trailerLink: movie.trailerLink,
                            thumbnail: getFullUrl(movie.image.formats.thumbnail.url),
                            nameRU,
                            nameEN,
                        };
                    });
            })
    }

    _checkResponse(response) {
        return response.ok
            ? response.json()
            : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`);
    }
}

export const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');
