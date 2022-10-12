import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import validator from "validator";

import {useFormWithValidation} from "../hooks/FormValidator";

import FormTop from "../FormTop/FormTop";
import InputForm from "../InputForm/InputForm";
import InputField from "../InputField/InputField";
import FormBottom from "../FormBottom/FormBottom";

import {mainApi} from "../../utils/MainApi";

import {
    ENTER_VALID_EMAIL_ADDRESS,
    USER_ALREADY_EXISTS,
    USER_NAME_RULES,
    USER_REGISTRATION_ERROR
} from "../../utils/Constants";

import "./Register.css";

export default function Register() {
    const [errorMessage, setErrorMessage] = useState('');

    const {values, errors, isValid, handleChange} = useFormWithValidation(
        {name: '', email: '', password: ''},
        {name: '', email: '', password: ''},
        false,
    );

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        mainApi
            .signup(values)
            .then(() => {
                mainApi
                    .signin({
                        email: values.email,
                        password: values.password
                    })
                    .then(() => navigate("/movies"))
                    .catch(err => console.log(err));
            })
            .catch((err) => {
                console.log(err);

                if (err.status === 409) {
                    setErrorMessage(USER_ALREADY_EXISTS);
                } else {
                    setErrorMessage(USER_REGISTRATION_ERROR);
                }
            });
    }

    function handleFormChange(event) {
        setErrorMessage('');
        handleChange(event);
    }

    function nameValidator(value, validity) {
        console.log(validity);

        return value.length === 0 || !validity.patternMismatch
            ? ""
            : USER_NAME_RULES;
    }

    function emailValidator(value) {
        return value.length === 0 || validator.isEmail(value)
            ? ""
            : ENTER_VALID_EMAIL_ADDRESS;
    }

    return (
        <div className="register-page">
            <FormTop title="Добро пожаловать!"/>

            <InputForm
                name="register"
                submitText="Зарегистрироваться"
                isValid={isValid}
                error={errorMessage}
                onSubmit={handleSubmit}
            >
                <InputField
                    label="Имя"
                    name="name"
                    type="text"
                    placeholder="Имя пользователя"
                    value={values.name}
                    error={errors.name}
                    onChange={handleFormChange}
                    pattern={"[A-Za-zА-Яа-я- ]+"}
                    validator={nameValidator}
                />

                <InputField
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="email пользователя"
                    value={values.email}
                    error={errors.email}
                    onChange={handleFormChange}
                    validator={emailValidator}
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

            <FormBottom message="Уже зарегистрированы?">
                <Link to="/signin" className="register-page__link">Войти</Link>
            </FormBottom>
        </div>
    );
}
