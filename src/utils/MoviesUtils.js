import {
    DEFAULT_EXTRA_MOVIES_COUNT,
    DESKTOP_EXTRA_MOVIES_COUNT,
    DESKTOP_INITIAL_MOVIES_COUNT,
    DESKTOP_MIN_WIDTH,
    MOBILE_INITIAL_MOVIES_COUNT,
    SHORT_MOVIES_MAX_DURATION,
    TABLET_INITIAL_MOVIES_COUNT,
    TABLET_MIN_WIDTH,
} from "./Constants";

export function filterMovies(movies, filter, shortMovies) {
    const filterInLowerCase = filter.toLowerCase();
    return movies
        .filter((movie) => filterInLowerCase.length === 0 || movie.nameRU?.toLowerCase().includes(filterInLowerCase))
        .filter((movie) => !shortMovies || movie.duration <= SHORT_MOVIES_MAX_DURATION);
}

export function getFullUrl(url) {
    return "https://api.nomoreparties.co" + url;
}

export function getStartCountOfVisibleMovies(width) {
    if (width >= DESKTOP_MIN_WIDTH) {
        return DESKTOP_INITIAL_MOVIES_COUNT;
    }

    if (width >= TABLET_MIN_WIDTH) {
        return TABLET_INITIAL_MOVIES_COUNT;
    }

    return MOBILE_INITIAL_MOVIES_COUNT;
}

export function getExtraMoviesCount(width) {
    return width >= DESKTOP_MIN_WIDTH
        ? DESKTOP_EXTRA_MOVIES_COUNT
        : DEFAULT_EXTRA_MOVIES_COUNT;
}
