import {useCallback, useState} from "react";

export function useFormWithValidation(initialValues = {}, initialErrors = {}, initialIsValid = false) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(initialIsValid);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, errors, isValid, handleChange, resetForm };
}
