import {useState} from "react";
import {Link} from "react-router-dom";

import "./Register.css";

import FormTop from "../FormTop/FormTop";
import InputForm from "../InputForm/InputForm";
import InputField from "../InputField/InputField";
import FormBottom from "../FormBottom/FormBottom";

export default function Register({onRegister}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister({name, email, password});
    };

    return (
        <div className="register-page">
            <FormTop title="Добро пожаловать!"/>

            <InputForm
                name="register"
                submitText="Зарегистрироваться"
                onSubmit={handleSubmit}
            >
                <InputField
                    label="Имя"
                    name="name"
                    type="text"
                    placeholder="Имя пользователя"
                    value={name}
                    onChange={handleNameChange}
                />

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

            <FormBottom message="Уже зарегистрированы?">
                <Link to="/signin" className="register-page__link">Войти</Link>
            </FormBottom>
        </div>
    );
}
