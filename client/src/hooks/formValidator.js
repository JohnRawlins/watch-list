export default  (fieldName, fieldValue, formFields, setFormFields) => {
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
