import "./InputForm.css";

export default function InputForm({name, submitText, isValid, onSubmit, error, children}) {
    return (
        <form name={name} className="input-form" noValidate onSubmit={onSubmit}>
            <fieldset className="input-form__fields">
                {children}
            </fieldset>
            <span className="input_form__error-message">{error}</span>
            <button type="submit" className="input-form__submit-button" disabled={!isValid}>{submitText}</button>
        </form>
    );
}
