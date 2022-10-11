import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({movies, savedMovies, count, onLikeClick, onDislikeClick, dislikeClassName}) {
    return (
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
    );
}
