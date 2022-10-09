import {useNavigate} from "react-router";

import "./PageNotFound.css";

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <p className="page__status">404</p>
            <h1 className="page__message">Страница не найдена</h1>
            <button type="button" className="page__back-button" onClick={() => navigate(-1)}>Назад</button>
        </div>
    );
}
