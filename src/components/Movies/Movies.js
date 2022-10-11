import {useEffect, useState} from "react";

import useWindowSize from "../hooks/WindowSize";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";

import {filterMovies, getExtraMoviesCount, getStartCountOfVisibleMovies} from "../../utils/MoviesUtils";
import {CANT_LOAD_MOVIES_FROM_SERVER_ERROR, NO_MOVIES_FOUND} from "../../utils/Constants";

import "./Movies.css";

export default function Movies() {
    const {width} = useWindowSize();

    const [savedMovies, setSavedMovies] = useState([]);
    const [filter, setFilter] = useState('');
    const [shortMovies, setShortMovies] = useState(false);
    const [movies, setMovies] = useState([]);
    const [visibleMoviesCount, setVisibleMoviesCount] = useState(getStartCountOfVisibleMovies(width));
    const [message, setMessage] = useState('');
    const [searchingInProgress, setSearchingInProgress] = useState(false);

    useEffect(
        () => {
            const state = localStorage.getItem("SearchState");
            if (state) {
                const {
                    filter = '',
                    shortMovies = false,
                    movies = [],
                    visibleMoviesCount = getStartCountOfVisibleMovies(width),
                    message = ''
                } = JSON.parse(state);

                setFilter(filter);
                setShortMovies(shortMovies);
                setMovies(movies);
                setVisibleMoviesCount(visibleMoviesCount);
                setMessage(message);
            }
        },
        []
    );

    useEffect(() => {
        mainApi.getSavedMovies()
            .then((response) => setSavedMovies(response))
            .catch((error) => console.log(error));
    }, []);

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    function handleShortMoviesChange(e) {
        const flag = e.target.checked;
        setShortMovies(flag);
        if (filter.length > 0) {
            handleSearch(filter, flag);
        }
    }

    function handleSearch(filter, shortMovies) {
        setSearchingInProgress(true);
        setMovies([]);
        setVisibleMoviesCount(0);
        setMessage('');

        moviesApi.loadMovies()
            .then((movies) => {
                const filteredMovies = filterMovies(movies, filter, shortMovies);
                const message = filteredMovies.length === 0
                    ? NO_MOVIES_FOUND
                    : '';

                setMovies(filteredMovies);
                setVisibleMoviesCount(getStartCountOfVisibleMovies(width));
                setMessage(message);

                localStorage.setItem("SearchState", JSON.stringify({
                    filter,
                    shortMovies,
                    movies: filteredMovies,
                    visibleMoviesCount,
                    message: message,
                }));
            })
            .catch((error) => {
                console.log(error);
                setMessage(CANT_LOAD_MOVIES_FROM_SERVER_ERROR);
            })
            .finally(() => setSearchingInProgress(false));
    }

    function handleLikeClick(movie) {
        mainApi.addMovie(movie)
            .then((savedMovie) => setSavedMovies([...savedMovies, savedMovie]))
            .catch((error) => console.log(error))
    }

    function handleDislikeClick(movieToDislike) {
        const savedMovie = savedMovies.find((movie) => movie.movieId === movieToDislike.movieId);
        mainApi.deleteMovie(savedMovie)
            .then(() => setSavedMovies(savedMovies.filter((movie) => movie._id !== savedMovie._id)))
            .catch((error) => console.log(error));
    }

    function handleMoreButtonClick() {
        if (visibleMoviesCount < movies.length) {
            const count = Math.min(visibleMoviesCount + getExtraMoviesCount(width), movies.length);
            setVisibleMoviesCount(count);

            localStorage.setItem("SearchState", JSON.stringify({
                filter,
                shortMovies,
                movies,
                visibleMoviesCount: count,
                message,
            }));
        }
    }

    return (
        <>
            <Header/>
            <main className="movies">
                <SearchForm
                    filter={filter}
                    shortMovies={shortMovies}
                    onFilterChange={handleFilterChange}
                    onShortMoviesChange={handleShortMoviesChange}
                    onSubmit={handleSearch}
                />
                {searchingInProgress && <Preloader/>}
                {message && <p className="movies-card-list__message">{message}</p>}
                {movies && <MoviesCardList
                    movies={movies}
                    savedMovies={savedMovies}
                    count={visibleMoviesCount}
                    onLikeClick={handleLikeClick}
                    onDislikeClick={handleDislikeClick}
                    dislikeClassName="movies-card__liked-movie"
                />}
                {movies.length > visibleMoviesCount &&
                    <button
                        className="movies-card-list__more-cards-button"
                        type="button"
                        onClick={handleMoreButtonClick}
                    >
                        Ещё
                    </button>
                }
            </main>
            <Footer/>
        </>
    );
}
