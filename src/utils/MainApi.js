class MainApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    signup(user) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(user),
        })
            .then(res => this._checkResponse(res));
    }

    signin(user) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(user),
        })
            .then(res => this._checkResponse(res));
    }

    signout() {
        return fetch(`${this._baseUrl}/signout`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    updateProfile(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(user),
        })
            .then(res => this._checkResponse(res));
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    addMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(movie),
        })
            .then(res => this._checkResponse(res));
    }

    deleteMovie(movie) {
        return fetch(`${this._baseUrl}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(response) {
        return response.ok
            ? response.json()
            : Promise.reject(response);
    }
}

export const mainApi = new MainApi({
//    baseUrl: 'https://api.misterrian.movies.nomoredomains.sbs',
    baseUrl: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    }
});
