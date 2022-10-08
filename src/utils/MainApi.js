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

    getSavedMovies() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(response) {
        return response.ok
            ? response.json()
            : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`);
    }
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.misterrian.movies.nomoredomains.sbs',
    headers: {
        'Content-Type': 'application/json',
    }
});
