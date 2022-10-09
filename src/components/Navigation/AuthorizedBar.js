import {Link, useLocation} from "react-router-dom";
import ProfileLink from "./ProfileLink";

import "./AuthorizedBar.css";

export default function AuthorizedBar() {
    const location = useLocation();
    return (
        <div className="authorized-bar">
            <div className="authorized-bar__links">
                <Link to="/movies" className={getLinkClassName(location, "/movies")}>Фильмы</Link>
                <Link
                    to="/saved-movies"
                    className={getLinkClassName(location, "/saved-movies")}
                >
                    Сохранённые фильмы
                </Link>
            </div>
            <ProfileLink/>
        </div>
    );
}

function getLinkClassName(location, route) {
    return location.pathname === route
        ? "authorized-bar__link authorized-bar__selected-link"
        : "authorized-bar__link";
}
