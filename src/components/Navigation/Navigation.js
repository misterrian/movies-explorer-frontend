import React, {useContext} from "react";
import {Link} from "react-router-dom";

import {CurrentUserContext} from "../../contexts/CurrentUserContext";

import "./Navigation.css";

export default function Navigation() {
    const currentUser = useContext(CurrentUserContext);

    if (currentUser._id) {
        return (
            <div className="navigation-bar">

            </div>
        );
    }

    return (
        <div className="navigation-bar">
            <Link to="/signup" className="navigation-bar__link navigation-bar__register-link">Регистрация</Link>
            <Link to="/signin" className="navigation-bar__link navigation-bar__login-link">Войти</Link>
        </div>
    );
}
