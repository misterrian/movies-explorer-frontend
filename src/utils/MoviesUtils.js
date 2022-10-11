export function filterMovies(movies, filter, shortMovies) {
    const filterInLowerCase = filter.toLowerCase();
    return movies
        .filter((movie) => movie.nameRU?.toLowerCase().includes(filterInLowerCase))
        .filter((movie) => {
            const duration = movie.duration;
            if (duration) {
                return shortMovies
                    ? movie.duration <= 40
                    : movie.duration > 40;
            }
            return false;
        });
}

export function getStartCountOfVisibleMovies(width) {
    if (width > 1249) {
        return 12;
    }

    if (width > 737) {
        return 8;
    }

    return 5;
}

export function getExtraMoviesCount(width) {
    return width > 1249
        ? 3
        : 2;
}
