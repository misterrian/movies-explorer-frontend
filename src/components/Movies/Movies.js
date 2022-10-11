import {useEffect, useState} from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import {moviesApi} from "../../utils/MoviesApi";

import "./Movies.css";

export default function Movies({savedMovies, setSavedMovies}) {
    const [movies, setMovies] = useState(null);
    const [searchingInProgress, setSearchingInProgress] = useState(false);

    useEffect(
        () => {
            const movies = localStorage.getItem("MovieCards");
            if (movies) {
                setMovies(JSON.parse(movies));
            }
        },
        []
    );

    function handleSearch(filter, includeShortFilms) {
        setSearchingInProgress(true);

        if (movies && movies.length === 0) {
            setMovies(null);
        }

        const filterInLowerCase = filter.toLowerCase();
        moviesApi.loadMovies()
            .then((movies) => {
                const filteredMovies = movies.filter(film => {
                    if (!includeShortFilms && film.duration <= 40) {
                        return false;
                    }

                    return filter.length === 0
                        || (film.nameRU && film.nameRU.toLowerCase().includes(filterInLowerCase));
                });

                setMovies(filteredMovies);
                localStorage.setItem("MovieCards", JSON.stringify(filteredMovies));
            })
            .catch(error => console.log(error))
            .finally(() => setSearchingInProgress(false));
    }

    function handleLikeClick(movie) {
        setSavedMovies([...savedMovies, movie]);
    }

    function handleDislikeClick(movieToDislike) {
        setSavedMovies(savedMovies.filter((movie) => movie.id !== movieToDislike.id));
    }

    return (
        <>
            <Header/>
            <main className="movies">
                <SearchForm onSubmit={handleSearch}/>
                {searchingInProgress && <Preloader/>}
                {movies && <MoviesCardList
                    movies={movies}
                    savedMovies={savedMovies}
                    count={12}
                    onLikeClick={handleLikeClick}
                    onDislikeClick={handleDislikeClick}
                    dislikeClassName="movies-card__liked-movie"
                />}
            </main>
            <Footer/>
        </>
    );
}
