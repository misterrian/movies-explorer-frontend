import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import "./Main.css";

export default function Main() {
    return (
        <>
            <Header/>
            <main className="main-page">
                <Promo/>
                <AboutProject/>
                <Techs/>
                <AboutMe/>
            </main>
            <Footer/>
        </>
    );
}
