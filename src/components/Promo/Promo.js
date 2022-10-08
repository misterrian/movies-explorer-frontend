import "./Promo.css";

import webWorldImage from '../../images/web-world.svg';

export default function Promo() {
    return (
        <section className="promo-section">
            <img src={webWorldImage} alt="Изображение мира Web" className="promo-section__web-world"/>
            <h1 className="promo-section__header">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo-section__suggestion">Листайте ниже, чтобы узнать больше про этот проект и его
                создателя.</p>
            <a className="promo-section__learn-more" href="#about">Узнать больше</a>
        </section>
    );
}
