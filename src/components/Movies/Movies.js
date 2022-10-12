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

import {
    CANT_LOAD_MOVIES_FROM_SERVER_ERROR,
    NO_MOVIES_FOUND,
    SEARCHING_WORD_REQUIRED,
} from "../../utils/Constants";

import "./Movies.css";

export default function Movies() {
    const {width} = useWindowSize();

    const [savedMovies, setSavedMovies] = useState([]);
    const [filter, setFilter] = useState('');
    const [shortMovies, setShortMovies] = useState(false);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
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
                setFilteredMovies(movies);
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
        setFilteredMovies([]);
        setVisibleMoviesCount(0);

        if (filter.length === 0) {
            setMessage(SEARCHING_WORD_REQUIRED);
            return;
        }

        setSearchingInProgress(true);
        setMessage("");

        const moviesPromise = movies.length === 0
            ? moviesApi.loadMovies()
                .then((movies) => {
                    setMovies(movies);
                    return movies;
                })
            : Promise.resolve(movies);

        moviesPromise
            .then((movies) => {
                const filteredMovies = filterMovies(movies, filter, shortMovies);
                const message = filteredMovies.length === 0
                    ? NO_MOVIES_FOUND
                    : '';

                setFilteredMovies(filteredMovies);
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
        if (visibleMoviesCount < filteredMovies.length) {
            const count = Math.min(visibleMoviesCount + getExtraMoviesCount(width), filteredMovies.length);
            setVisibleMoviesCount(count);

            localStorage.setItem("SearchState", JSON.stringify({
                filter,
                shortMovies,
                movies: filteredMovies,
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
                {filteredMovies && <MoviesCardList
                    message={message}
                    movies={filteredMovies}
                    savedMovies={savedMovies}
                    count={visibleMoviesCount}
                    onLikeClick={handleLikeClick}
                    onDislikeClick={handleDislikeClick}
                    dislikeClassName="movies-card__liked-movie"
                />}
                {filteredMovies.length > visibleMoviesCount &&
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
