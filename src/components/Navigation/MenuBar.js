import {useState} from "react";
import Menu from "./Menu";

import "./MenuBar.css";

export default function MenuBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => setIsMenuOpen(true);
    const handleCloseClick = () => setIsMenuOpen(false);

    return (
        <>
            <div className="menu-bar" onClick={handleMenuClick} />
            <Menu
                isOpen={isMenuOpen}
                onClose={handleCloseClick}
            />
        </>
    );
}
