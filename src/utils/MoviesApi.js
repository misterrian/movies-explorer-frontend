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
            .then(res => this._checkResponse(res));
    }

    _checkResponse(response) {
        return response.ok
            ? response.json()
            : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`);
    }
}

export const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');
