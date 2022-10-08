import {useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import "./Header.css";

import logoImage from "../../images/logo.svg";

export default function Header() {
    const {pathname} = useLocation();
    const className = pathname === "/" ? "header header__main-page" : "header";
    return (
        <header className={className}>
            <img src={logoImage} alt="Логотип" className="header__logo"/>
            <Navigation/>
        </header>
    );
}
