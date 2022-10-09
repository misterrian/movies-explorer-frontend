import "./InputForm.css";

export default function InputForm({name, submitText, onSubmit, children}) {
    return (
        <form name={name} className="input-form" noValidate onSubmit={onSubmit}>
            <fieldset className="input-form__fields">
                {children}
            </fieldset>
            <button type="submit" className="input-form__submit-button">{submitText}</button>
        </form>
    );
}
