import {Link, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import "./Header.css";

export default function Header() {
    const {pathname} = useLocation();
    const className = pathname === "/" ? "header header__main-page" : "header";
    return (
        <header className={className}>
            <Link to="/" className="header__logo"/>
            <Navigation/>
        </header>
    );
}
