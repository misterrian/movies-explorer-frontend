import {Link, useLocation} from "react-router-dom";
import ProfileLink from "./ProfileLink";

import "./Menu.css";

export default function Menu({isOpen, onClose}) {
    const location = useLocation();
    return (
        <div className={isOpen ? "menu menu_opened" : "menu"}>
            <button type="button" className="menu__close-button" onClick={onClose}/>
            <div className="menu__links">
                <Link to="/" className={getLinkClassName(location, "/")}>Главная</Link>
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
        ? "menu__link menu__selected-link"
        : "menu__link";
}
