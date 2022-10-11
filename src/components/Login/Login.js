import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

import {useFormWithValidation} from "../hooks/FormValidator";

import FormTop from "../FormTop/FormTop";
import InputForm from "../InputForm/InputForm";
import InputField from "../InputField/InputField";
import FormBottom from "../FormBottom/FormBottom";

import {mainApi} from "../../utils/MainApi";
import {AUTHORIZATION_ERROR, INCORRECT_LOGIN_OR_PASSWORD} from "../../utils/Constants";

import "./Login.css";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');

    const {values, errors, isValid, handleChange} = useFormWithValidation(
        {email: '', password: ''},
        {email: '', password: ''},
        false,
    );

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        mainApi
            .signin({
                email: values.email,
                password: values.password
            })
            .then(() => navigate("/movies"))
            .catch(err => {
                console.log(err);

                if (err.status === 409) {
                    setErrorMessage(INCORRECT_LOGIN_OR_PASSWORD);
                } else {
                    setErrorMessage(AUTHORIZATION_ERROR);
                }
            });
    }

    function handleFormChange(event) {
        setErrorMessage('');
        handleChange(event);
    }

    return (
        <div className="login-page">
            <FormTop title="Рады видеть!"/>

            <InputForm
                name="login"
                submitText="Войти"
                isValid={isValid}
                error={errorMessage}
                onSubmit={handleSubmit}
            >
                <InputField
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="email пользователя"
                    value={values.email}
                    error={errors.email}
                    onChange={handleFormChange}
                />

                <InputField
                    label="Пароль"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={values.password}
                    error={errors.password}
                    onChange={handleFormChange}
                />
            </InputForm>

            <FormBottom message="Ещё не зарегистрированы?">
                <Link to="/signup" className="login-page__link">Регистрация</Link>
            </FormBottom>
        </div>
    );
}
