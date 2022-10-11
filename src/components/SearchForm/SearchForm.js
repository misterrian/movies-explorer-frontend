import "./SearchForm.css";

export default function SearchForm(props) {
    const {
        filter = '',
        shortMovies = false,
        onFilterChange,
        onShortMoviesChange,
        onSubmit,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(filter, shortMovies);
    }

    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__filter-group">
                    <input
                        className="search-form__filter"
                        type="text"
                        placeholder="Фильм"
                        value={filter}
                        required
                        onChange={onFilterChange}
                    />
                    <button type="submit" className="search-form__start-search"/>
                </div>
                <label htmlFor="short-films" className="short-films__checkbox-label">
                    <span>Короткометражки</span>
                    <input
                        className="search-form__hidden-input"
                        id="short-films"
                        type="checkbox"
                        checked={shortMovies}
                        onChange={onShortMoviesChange}
                    />
                    <span className="search-form__pseudo-checkbox"></span>
                </label>
            </form>
            <div className="search-form__bottom-line"/>
        </>
    );
}
