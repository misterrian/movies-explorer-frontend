import {useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import "./Header.css";

import logoImage from "../../images2/logo.svg";

export default function Header() {
    const location = useLocation();
    return (
        <header className={`header${location.pathname === "/" && " header__main-page"}`}>
            <img src={logoImage} alt="Логотип" className="header__logo"/>
            <Navigation/>
        </header>
    );
}
