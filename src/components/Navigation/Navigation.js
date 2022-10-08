import {useContext} from "react";

import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import AuthorizedBar from "./AuthorizedBar";
import UnauthorizedBar from "./UnauthorizedBar";
import MenuBar from "./MenuBar";

export default function Navigation() {
    const currentUser = useContext(CurrentUserContext);
    return currentUser._id
        ? (
            <>
                <AuthorizedBar/>
                <MenuBar/>
            </>
        )
        : (<UnauthorizedBar/>);
}
