import { useState, useEffect } from 'react';

const useForm = () => {
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    username: [],
    password: [],
    confirmPassword: []
  });

  const [errorFound, setErrorFound] = useState(false);

  let passwordMatchError = false;

  useEffect(() => {
    let errorFound = false;

    for (const field in formErrors) {
      if (formErrors[field].length > 0) {
        errorFound = true;
      }
    }

    setErrorFound(errorFound);
  }, [formErrors, formFields]);

  const updateFormFields = (field, confirmPasswordElem, passwordElem) => {
    const fieldName = field.target.name;
    const fieldValue = field.target.value;

    if (
      confirmPasswordElem &&
      passwordElem &&
      confirmPasswordElem.current.value !== passwordElem.current.value
    ) {
      passwordMatchError = true;
    }

    checkInputErrors(fieldName, fieldValue);

    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const checkInputErrors = (fieldName, fieldValue) => {
    switch (fieldName) {
      case 'username': {
        const errors = [];
        if (fieldValue.includes(' ')) {
          errors.push('Username cannot contain spaces');
        }

        if (fieldValue.length < 1) {
          errors.push('Username is required');
        }

        setFormErrors({ ...formErrors, [fieldName]: errors });
        break;
      }

      case 'password': {
        const errors = [];
        if (fieldValue.includes(' ')) {
          errors.push('Password cannot contain spaces');
        }

        if (fieldValue.length < 6) {
          errors.push('Password must contain at least 6 characters');
        }

        if (passwordMatchError) {
          setFormErrors({
            ...formErrors,
            [fieldName]: errors,
            confirmPassword: ['Passwords do not match']
          });
          break;
        } else {
          setFormErrors({
            ...formErrors,
            [fieldName]: errors,
            confirmPassword: []
          });
          break;
        }
      }

      case 'confirmPassword': {
        if (passwordMatchError) {
          setFormErrors({
            ...formErrors,
            [fieldName]: ['Passwords do not match']
          });
        } else {
          setFormErrors({
            ...formErrors,
            [fieldName]: []
          });
        }
      }
    }
  };

  return { updateFormFields, formFields, formErrors, errorFound };
};

export default useForm;
