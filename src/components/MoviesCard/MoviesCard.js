import "./MoviesCard.css";

export default function MoviesCard({movie, savedMovies, onLikeClick, onDislikeClick, dislikeClassName}) {
    const isSavedCard = movie && savedMovies.some((savedMovie) => savedMovie.id === movie.id);
    return (
        <div className="movies-card">
            <img
                className="movies-card__image"
                src={"https://api.nomoreparties.co" + movie.image.url}
                alt={movie.image.name}
            />
            <p className="movies-card__name">{movie.nameRU}</p>
            <p className="movies-card__duration">{getDuration(movie.duration)}</p>
            {
                onDislikeClick && isSavedCard && <div
                    className={dislikeClassName}
                    onClick={() => onDislikeClick(movie)}
                />
            }
            {
                onLikeClick && !isSavedCard && <button
                    className="movies-card__save-button"
                    onClick={() => onLikeClick(movie)}
                >
                    Сохранить
                </button>
            }
        </div>
    );
}

function getDuration(duration) {
    if (duration === 0) {
        return "0";
    }

    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;

    if (hours === 0) {
        return duration + "м";
    }

    if (minutes === 0) {
        return hours + "ч";
    }

    return hours + "ч " + minutes + "м";
}
