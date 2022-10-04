import {Navigate} from "react-router";

export default function ProtectedRoute({isLoggedIn, children}) {
    return (
        isLoggedIn
            ? children
            : <Navigate to="/signin"/>
    );
}
