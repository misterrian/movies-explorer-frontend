import {useState} from "react";

import "./SearchForm.css";

export default function SearchForm({onSubmit}) {
    const [filter, setFilter] = useState("");
    const [includeShortFilms, setIncludeShortFilms] = useState(false);

    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleShortFilmsChange = (e) => setIncludeShortFilms(e.target.checked);

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(filter, includeShortFilms);
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
                        onChange={handleFilterChange}
                    />
                    <button type="submit" className="search-form__start-search"/>
                </div>
                <label htmlFor="short-films" className="short-films__checkbox-label">
                    <span>Короткометражки</span>
                    <input
                        className="search-form__hidden-input"
                        id="short-films"
                        type="checkbox"
                        onChange={handleShortFilmsChange}
                    />
                    <span className="search-form__pseudo-checkbox"></span>
                </label>
            </form>
            <div className="search-form__bottom-line"/>
        </>
    );
}
