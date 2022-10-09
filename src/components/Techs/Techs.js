import Title from "../Title/Title";

import "./Techs.css";

export default function Techs() {
    return (
        <section className="techs-section">
            <Title title="Технологии"/>
            <p className="techs-section__technologies">7 технологий</p>
            <p className="techs-section__description">На курсе веб-разработки мы освоили технологии, которые применили в
                дипломном проекте.</p>
            <ul className="techs-section__description-list">
                <li className="techs-section__description-item">HTML</li>
                <li className="techs-section__description-item">CSS</li>
                <li className="techs-section__description-item">JS</li>
                <li className="techs-section__description-item">React</li>
                <li className="techs-section__description-item">Git</li>
                <li className="techs-section__description-item">Express.js</li>
                <li className="techs-section__description-item">mongoDB</li>
            </ul>
        </section>
    );
}
