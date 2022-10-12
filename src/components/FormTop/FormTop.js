import "./FormTop.css";
import {Link} from "react-router-dom";

export default function FormTop({title}) {
    return (
        <header className="form-top">
            <Link to="/" className="form-top__logo"/>
            <h2 className="form-top__title">{title}</h2>
        </header>
    );
}
