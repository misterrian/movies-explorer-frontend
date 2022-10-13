import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router";

import {CurrentUserContext, defaultCurrentUser} from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../common/ProtectedRoute";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";

import {mainApi} from "../../utils/MainApi";
import {useLocation} from "react-router-dom";

export default function App() {
    const [currentUser, setCurrentUser] = useState(defaultCurrentUser);

    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        if (!currentUser._id) {
            mainApi.getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                    if (pathname === "/signup" || pathname === "/signin") {
                        navigate("/");
                    }
                })
                .catch(err => {
                    console.log(err);
                    if (pathname === "/profile" || pathname === "/movies" || pathname === "/saved-movies") {
                        cleanup();
                    }
                });
        }
    }, [navigate, currentUser]);

    function handleUserUpdated(name, email) {
        setCurrentUser({
            _id: currentUser._id,
            name,
            email,
        });
    }

    function handleExitClick() {
        mainApi.signout()
            .then(() => cleanup())
            .catch(error => console.log(error));
    }

    function cleanup() {
        setCurrentUser(defaultCurrentUser);
        localStorage.removeItem("SearchState");
        navigate("/");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/signup" element={<Register/>}/>
                <Route path="/signin" element={<Login/>}/>
                <Route index element={<Main/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute isLoggedIn={currentUser._id}>
                        <Profile onUserUpdated={handleUserUpdated} onExit={handleExitClick}/>
                    </ProtectedRoute>
                }/>
                <Route path="/movies" element={
                    <ProtectedRoute isLoggedIn={currentUser._id}>
                        <Movies/>
                    </ProtectedRoute>
                }/>
                <Route path="/saved-movies" element={
                    <ProtectedRoute isLoggedIn={currentUser._id}>
                        <SavedMovies/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </CurrentUserContext.Provider>
    );
}
