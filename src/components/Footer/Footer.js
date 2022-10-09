import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__project">Учебный проект Яндекс.Практикум х BeatFilm</p>
            <div className="footer__bottom">
                <p className="footer__copyright">&copy; 2022</p>
                <div className="footer__links">
                    <a className="footer__link" target="_blank" href="https://practicum.yandex.ru"
                       rel="noreferrer">Яндекс.Практикум</a>
                    <a className="footer__link" target="_blank" href="https://github.com/" rel="noreferrer">Github</a>
                </div>
            </div>
        </footer>
    );
}
