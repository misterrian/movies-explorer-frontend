import "./FormTop.css";
import logoImage from "../../images/logo.svg";

export default function FormTop({title}) {
    return (
        <header className="form-top">
            <img src={logoImage} alt="Логотип" className="form-top__logo"/>
            <h2 className="form-top__title">{title}</h2>
        </header>
    );
}
