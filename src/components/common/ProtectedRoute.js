export default function ProtectedRoute({isLoggedIn, children}) {
    return (
        isLoggedIn
            ? children
            : <></>
    );
}
