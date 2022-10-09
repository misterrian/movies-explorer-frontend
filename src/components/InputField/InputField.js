import "./InputField.css";

export default function InputField(props) {
    const {
        label,
        name,
        type,
        placeholder,
        value,
        onChange,
    } = props;

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
            />

            <span className="input-field__error">Что-то пошло не так...</span>
        </>
    );
}
