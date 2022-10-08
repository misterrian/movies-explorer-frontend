import {Link} from "react-router-dom";

import "./ProfileLink.css";

export default function ProfileLink() {
    return (
        <Link to="/profile" className="profile-link">
            Аккаунт
            <div className="profile-link__icon"></div>
        </Link>
    );
}
