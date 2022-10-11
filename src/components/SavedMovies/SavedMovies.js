import {useEffect, useState} from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import {mainApi} from "../../utils/MainApi";
import {filterMovies} from "../../utils/MoviesUtils";

import "./SavedMovies.css";

export default function SavedMovies() {
    const [savedMovies, setSavedMovies] = useState([]);
    const [moviesFilter, setMoviesFilter] = useState('');
    const [shortMoviesFilter, setShortMoviesFilter] = useState(false);

    useEffect(() => {
        mainApi.getSavedMovies()
            .then((response) => setSavedMovies(response))
            .catch((error) => console.log(error));
    }, []);

    function handleDislikeClick(movieToDislike) {
        mainApi.deleteMovie(movieToDislike)
            .then(() => setSavedMovies(savedMovies.filter((movie) => movie._id !== movieToDislike._id)))
            .catch((error) => console.log(error));
    }

    function handleFilterChange(e) {
        setMoviesFilter(e.target.value);
    }

    function handleShortMoviesChange(e) {
        const flag = e.target.checked;
        setShortMoviesFilter(flag);
        if (moviesFilter.length > 0) {
            handleSearch(moviesFilter, flag);
        }
    }

    function handleSearch(filter, shortMovies) {
        filterMovies(savedMovies, filter, shortMovies);
    }

    return (
        <>
            <Header/>
            <main className="saved-movies">
                <SearchForm
                    filter={moviesFilter}
                    shortMovies={shortMoviesFilter}
                    onFilterChange={handleFilterChange}
                    onShortMoviesChange={handleShortMoviesChange}
                    onSubmit={handleSearch}
                />
                {savedMovies && <MoviesCardList
                    movies={savedMovies}
                    savedMovies={savedMovies}
                    count={Number.MAX_SAFE_INTEGER}
                    onDislikeClick={handleDislikeClick}
                    dislikeClassName="movies-card__remove-movie-button"
                />}
                <div className="saved-movies__delimiter"/>
            </main>
            <Footer/>
        </>
    );
}
