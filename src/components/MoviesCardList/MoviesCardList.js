import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList(props) {
    const {message, movies, savedMovies, count, onLikeClick, onDislikeClick, dislikeClassName} = props;
    return (
        <>
            {message && <p className="movies-card-list__message">{message}</p>}
            <div className="movies-card-list">
                {
                    movies
                        .slice(0, count)
                        .map((movie) => <MoviesCard
                            key={movie.movieId}
                            movie={movie}
                            savedMovies={savedMovies}
                            onLikeClick={onLikeClick}
                            onDislikeClick={onDislikeClick}
                            dislikeClassName={dislikeClassName}
                        />)
                }
            </div>
        </>
    );
}
