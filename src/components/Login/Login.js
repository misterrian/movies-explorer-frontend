import React from "react";
import {Link} from "react-router-dom";

import "./Login.css";

import FormTop from "../FormTop/FormTop";
import InputForm from "../InputForm/InputForm";
import InputField from "../InputField/InputField";
import FormBottom from "../FormBottom/FormBottom";

export default function Login({onLogin}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    function handleSubmit(event) {
        event.preventDefault();
        onLogin({email, password});
    }

    return (
        <div className="login-page">
            <FormTop title="Рады видеть!"/>

            <InputForm
                name="login"
                submitText="Войти"
                onSubmit={handleSubmit}
            >
                <InputField
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="email пользователя"
                    value={email}
                    onChange={handleEmailChange}
                />

                <InputField
                    label="Пароль"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </InputForm>

            <FormBottom message="Ещё не зарегистрированы?">
                <Link to="/signup" className="login-page__link">Регистрация</Link>
            </FormBottom>
        </div>
    );
}
