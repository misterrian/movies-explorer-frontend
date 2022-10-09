import {useContext, useState} from "react";

import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";

import "./Profile.css";

export default function Profile({onExit}) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleEditClick = () => setIsEditMode(true);
    const handleSaveClick = () => setIsEditMode(false);

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
                {
                    isEditMode && <span className="profile__error-message">
                        При обновлении профиля произошла ошибка.
                    </span>
                }
                {
                    isEditMode && <button
                        type="button"
                        className="profile__save-button"
                        onClick={handleSaveClick}
                    >
                        Сохранить
                    </button>
                }
            </main>
        </>
    );
}
