import "./PortfolioItem.css";

import arrowImage from "../../images/arrow.svg";

export default function PortfolioItem({title, href}) {
    return (
        <li className="portfolio-item">
            <a className="portfolio-item__link" target="_blank" href={href} rel="noreferrer">
                {title}
                <img src={arrowImage} alt={title} className="portfolio-item__arrow"/>
            </a>
        </li>
    );
}
