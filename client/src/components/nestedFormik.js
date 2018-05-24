import _ from 'lodash';

export function nestedFormikProps (formProps, nestedFieldName) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateForm
  } = formProps;

  const combineWithFieldName = (subField) => {
    return subField.startsWith("[") ? `${nestedFieldName}${subField}` : `${nestedFieldName}.${subField}`;
  }

  const nestedHandleChange = (event) => {
    setFieldValue(combineWithFieldName(event.target.name), event.target.value);
  };
  
  const nestedSetFieldTouched = (name, value) => {
    setFieldTouched(combineWithFieldName(name), value);
  }

  const nestedSetFieldValue = (name, value) => {
    setFieldValue(combineWithFieldName(name), value);
  }

  const nestedHandleBlur = (event) => {
    nestedSetFieldTouched(event.target.name, true);
    validateForm({
      ...values,
      [combineWithFieldName(event.target.name)]: event.target.value
    });
  }

  const nestedValidateForm = (fieldValues) => {
    validateForm({
      ...values,
      [nestedFieldName]: fieldValues
    });
  }

  return {
    ...formProps,
    values: _.get(values, nestedFieldName),
    errors: _.get(errors, nestedFieldName) ? _.get(errors, nestedFieldName) : {},
    touched: _.get(touched, nestedFieldName) ? _.get(touched, nestedFieldName) : {},
    handleChange: nestedHandleChange,
    handleBlur: nestedHandleBlur,
    setFieldValue: nestedSetFieldValue,
    setFieldTouched: nestedSetFieldTouched,
    validateForm: nestedValidateForm
  };
}

export function nestedFormikValidate(validate, nestedFieldName) {
  return (values) => {
    let errors = {};
    let subErrors = validate(_.get(values, nestedFieldName));
    _.set(errors, nestedFieldName, subErrors);
    return errors;
  }
}