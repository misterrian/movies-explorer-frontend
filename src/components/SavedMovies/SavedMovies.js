import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import "./SavedMovies.css";

export default function SavedMovies({savedMovies, setSavedMovies}) {
    function handleDislikeClick(movieToDislike) {
        setSavedMovies(savedMovies.filter((movie) => movie.id !== movieToDislike.id));
    }

    return (
        <>
            <Header/>
            <main className="saved-movies">
                <SearchForm/>
                {savedMovies && <MoviesCardList
                    movies={savedMovies}
                    savedMovies={savedMovies}
                    count={12}
                    onDislikeClick={handleDislikeClick}
                    dislikeClassName="movies-card__remove-movie-button"
                />}
                <div className="saved-movies__delimiter"/>
            </main>
            <Footer/>
        </>
    );
}
