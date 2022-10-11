import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({movies, savedMovies, count, onLikeClick, onDislikeClick, dislikeClassName}) {
    return (
        <>
            {movies.length === 0 && <p className="movies-card-list__not-found">Фильмы не найдены</p>}
            <div className="movies-card-list">
                {
                    movies
                        .slice(0, count)
                        .map((movie) => <MoviesCard
                            key={movie.id}
                            movie={movie}
                            savedMovies={savedMovies}
                            onLikeClick={onLikeClick}
                            onDislikeClick={onDislikeClick}
                            dislikeClassName={dislikeClassName}
                        />)
                }
            </div>
            {/*{movies.length > count && <button type="button" className="movies-card-list__more-cards-button">Ещё</button>}*/}
            {onLikeClick && <button type="button" className="movies-card-list__more-cards-button">Ещё</button>}
        </>
    );
}
