import "./PortfolioItem.css";

import arrowImage from "../../images2/arrow.svg";

export default function PortfolioItem({title, href}) {
    return (
        <li className="portfolio-item">
            {title}
            <a className="portfolio-item__link" target="_blank" href={href} rel="noreferrer">
                <img src={arrowImage} alt={title} className="portfolio-item__arrow"/>
            </a>
        </li>
    );
}
