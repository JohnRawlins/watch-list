import { useState, useEffect } from 'react';

const useForm = formValidator => {
  const [formFields, setFormFields] = useState({
    username: { value: '', errors: [] },
    password: { value: '', errors: [] },
    confirmPassword: { value: '', errors: [] }
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (formValidator) {
      let fieldCount = 0;

      for (const field in formFields) {
        if (formFields[field].value && formFields[field].errors.length === 0) {
          fieldCount++;
        }
      }

      if (fieldCount === 3) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
        return;
      }
    }
    setSubmitDisabled(false);
  }, [formFields, formValidator]);

  const updateFormFields = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFieldValues = {
      ...formFields,
      [fieldName]: { ...formFields[fieldName], value: fieldValue }
    };

    if (formValidator) {
      formValidator(fieldName, fieldValue, formFields, setFormFields);
    } else {
      switch (fieldName) {
        case 'username': {
          setFormFields(newFieldValues);
          break;
        }

        case 'password': {
          setFormFields(newFieldValues);
          break;
        }

        case 'confirmPassword': {
          setFormFields(newFieldValues);
        }
      }
    }
  };

  return { updateFormFields, formFields, submitDisabled };
};

export default useForm;
