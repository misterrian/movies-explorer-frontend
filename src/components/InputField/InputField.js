import "./InputField.css";

export default function InputField(props) {
    const {
        label,
        name,
        type,
        placeholder,
        value,
        error,
        onChange,
        pattern,
        validator,
    } = props;

    function handleInput(event) {
        if (validator) {
            const field = event.target;
            field.setCustomValidity(validator(field.value, field.validity));
        }
    }

    return (
        <>
            <label htmlFor={name} className="input-field__label">{label}</label>

            <input
                id={name}
                type={type}
                name={name}
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                pattern={pattern}
                onInput={handleInput}
            />

            <span className="input-field__error">{error}</span>
        </>
    );
}
