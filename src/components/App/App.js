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

export default function App() {
    const [currentUser, setCurrentUser] = useState(defaultCurrentUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser._id) {
            mainApi.getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                    navigate("/movies");
                })
                .catch(err => console.log(err));
        }
    }, [navigate, currentUser]);

    function handleExitClick() {
        mainApi.signout()
            .then(() => setCurrentUser(defaultCurrentUser))
            .catch(error => console.log(error));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/signup" element={<Register/>}/>
                <Route path="/signin" element={<Login/>}/>
                <Route index element={<Main/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute isLoggedIn={currentUser._id}>
                        <Profile onExit={handleExitClick}/>
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
