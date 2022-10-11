import {Navigate} from "react-router";

export default function ProtectedRoute({isLoggedIn, children}) {
    return (children);

    // return (
    //     isLoggedIn
    //         ? children
    //         : <Navigate to="/"/>
    // );
}
