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
                    .filter((movie) => movie.id
                        && movie.image?.url
                        && movie.trailerLink
                        && movie.image?.formats?.thumbnail?.url
                    )
                    .map((movie) => {
                        const {
                            country = '',
                            director = '',
                            duration = 0,
                            year = '',
                            description = '',
                            nameRU = '',
                            nameEN = '',
                        } = movie;

                        return {
                            movieId: movie.id,
                            image: "https://api.nomoreparties.co" + movie.image.url,
                            country,
                            director,
                            duration,
                            year,
                            description,
                            trailerLink: movie.trailerLink,
                            thumbnail: "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url,
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
