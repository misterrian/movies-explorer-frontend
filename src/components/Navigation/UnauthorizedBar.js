import {Link} from "react-router-dom";

import "./UnauthorizedBar.css";

export default function UnauthorizedBar() {
    return (
        <div className="unauthorized-bar">
            <Link to="/signup" className="unauthorized-bar__link unauthorized-bar__register-link">Регистрация</Link>
            <Link to="/signin" className="unauthorized-bar__link unauthorized-bar__login-link">Войти</Link>
        </div>
    );
}
