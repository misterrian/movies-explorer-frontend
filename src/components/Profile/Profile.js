import {useContext, useEffect, useState} from "react";
import validator from "validator";

import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";

import {mainApi} from "../../utils/MainApi";

import {UPDATE_PROFILE_ERROR, USER_ALREADY_EXISTS, USER_PROFILE_UPDATED} from "../../utils/Constants";

import "./Profile.css";

export default function Profile({onUserUpdated, onExit}) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [profileUpdatedMessage, setProfileUpdatedMessage] = useState("");

    useEffect(
        () => {
            const isDisabled = name.length === 0
                || !validator.isEmail(email)
                || (name === currentUser.name && email === currentUser.email);

            setIsSaveDisabled(isDisabled);
        },
        [name, email, currentUser]
    );

    const handleNameChange = (e) => {
        setName(e.target.value);
        setErrorMessage("");
        setProfileUpdatedMessage("");
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage("");
        setProfileUpdatedMessage("");
    }

    const handleEditClick = () => {
        setIsEditMode(true);
        setErrorMessage("");
        setProfileUpdatedMessage("");
    }

    const handleSaveClick = () => {
        mainApi.updateProfile({name, email})
            .then(() => {
                onUserUpdated(name, email);
                setIsEditMode(false);
                setProfileUpdatedMessage(USER_PROFILE_UPDATED);
            })
            .catch((err) => {
                if (err.status === 409) {
                    setErrorMessage(USER_ALREADY_EXISTS);
                } else {
                    setErrorMessage(UPDATE_PROFILE_ERROR);
                }
            });
    }

    const inputClassName = isEditMode ? "profile_enabled-input" : "";

    return (
        <>
            <Header/>
            <main className="profile">
                <h2 className="profile__header">Привет, {currentUser.name}!</h2>
                <div className={`profile__input-group profile_bottom-line ${inputClassName}`}>
                    <label htmlFor="name">Имя</label>
                    <input
                        className="profile__input-field"
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className={`profile__input-group ${inputClassName}`}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        className="profile__input-field"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <span className="profile__message">{profileUpdatedMessage}</span>
                {
                    !isEditMode && <button
                        type="button"
                        className="profile__button profile_edit-button"
                        onClick={handleEditClick}
                    >
                        Редактировать
                    </button>
                }
                {
                    !isEditMode && <button
                        type="button"
                        className="profile__button profile_exit-button"
                        onClick={onExit}
                    >
                        Выйти из аккаунта
                    </button>
                }
                {isEditMode && <span className="profile__error-message">{errorMessage}</span>}
                {
                    isEditMode && <button
                        className="profile__save-button"
                        type="button"
                        onClick={handleSaveClick}
                        disabled={isSaveDisabled}
                    >
                        Сохранить
                    </button>
                }
            </main>
        </>
    );
}
