import { useState, useEffect } from 'react';

const useRegisterForm = () => {
  const [formFields, setFormFields] = useState({
    username: { value: '', errors: [] },
    password: { value: '', errors: [] },
    confirmPassword: { value: '', errors: [] }
  });

  const [formStatus, setFormStatus] = useState(true);

  useEffect(() => {
    let submitDisabled = true;
    let fieldCount = 0;

    for (const field in formFields) {
      if (formFields[field].value && formFields[field].errors.length < 1) {
        fieldCount++;
        submitDisabled = false;
      }
    }

    if (fieldCount === 3) {
      setFormStatus(submitDisabled);
    } else {
      setFormStatus(true);
    }
  }, [formFields]);

  const validateForm = (fieldName, fieldValue) => {
    switch (fieldName) {
      case 'username': {
        const errors = [];
        if (fieldValue.includes(' ')) {
          errors.push('Username cannot contain spaces');
        }

        if (fieldValue.length < 1) {
          errors.push('Username is required');
        }

        setFormFields({
          ...formFields,
          [fieldName]: { value: fieldValue, errors }
        });
        break;
      }

      case 'password': {
        const errors = [];
        const passwordField = fieldValue;
        const confirmPasswordField = formFields.confirmPassword.value;
        if (fieldValue.includes(' ')) {
          errors.push('Password cannot contain spaces');
        }

        if (fieldValue.length < 6) {
          errors.push('Password must contain at least 6 characters');
        }

        if (
          passwordField !== confirmPasswordField &&
          confirmPasswordField !== ''
        ) {
          setFormFields({
            ...formFields,
            [fieldName]: { value: fieldValue, errors },
            confirmPassword: {
              ...formFields.confirmPassword,
              errors: ['Passwords do not match']
            }
          });
          break;
        } else {
          setFormFields({
            ...formFields,
            [fieldName]: { value: fieldValue, errors },
            confirmPassword: {
              ...formFields.confirmPassword,
              errors: []
            }
          });
          break;
        }
      }

      case 'confirmPassword': {
        const passwordField = formFields.password.value;
        const confirmPasswordField = fieldValue;
        if (passwordField !== confirmPasswordField) {
          setFormFields({
            ...formFields,
            [fieldName]: {
              value: fieldValue,
              errors: ['Passwords do not match']
            }
          });
        } else {
          setFormFields({
            ...formFields,
            [fieldName]: { value: fieldValue, errors: [] }
          });
        }
      }
    }
  };

  const updateFormFields = field => {
    const fieldName = field.target.name;
    const fieldValue = field.target.value;

    validateForm(fieldName, fieldValue);
  };

  return { updateFormFields, formFields, formStatus };
};

export default useRegisterForm;
