import Title from "../Title/Title";
import PortfolioItem from "./PortfolioItem";

import "./AboutMe.css";

import photoImage from "../../images2/its-me.jpg";

export default function AboutMe() {
    return (
        <section className="about-me-section">
            <Title title="Студент"/>
            <p className="about-me-section__name">Мария</p>
            <p className="about-me-section__occupation">Фронтенд-разработчик, 34 года</p>
            <p className="about-me-section__about">Родилась в Воронеже, живу в д. Пирогово (Московская область).
                Закончила архитектурный факультет ВГАСУ (Воронеж). После окончания университета работала по
                специальности вплоть до замужества. В браке родились двое деток. В настоящий момент нахожусь в декрете и
                параллельно изучаю веб-разработку.</p>
            <img src={photoImage} alt="Моя фотография" className="about-me-section__photo"/>
            <a className="about-me-section__link" target="_blank"
               href="https://github.com/misterrian?tab=repositories">Github</a>
            <h3 className="about-me-section__portfolio">Портфолио</h3>
            <ul className="about-me-section__portfolio-list">
                <PortfolioItem title="Статичный сайт" href="https://github.com/misterrian/how-to-learn"/>
                <PortfolioItem title="Адаптивный сайт" href="https://github.com/misterrian/russian-travel"/>
                <PortfolioItem
                    title="Одностраничное приложение"
                    href="https://github.com/misterrian/react-mesto-api-full"
                />
            </ul>
        </section>
    );
}
