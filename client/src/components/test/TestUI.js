 import React, { Component } from 'react';
 import { Form, Button } from 'reactstrap';
 import  { withFormik, Formik } from 'formik';

import { nestedFormikProps, nestedFormikValidate } from '../nestedFormik';
import ChoiceForm from '../lecturer/choice.form';

class TestForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validate(values) {
    const errors = {};
    return errors;
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = formProps;

    return (
      <Form onSubmit={handleSubmit}>
        <ChoiceForm {...nestedFormikProps(formProps, "choices")} />
        <Button>Submit</Button>
      </Form>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={{
          choices: ["AA", "BB", "CC", "DD", "EE"]
        }}
        validate={this.validate}
        onSubmit={this.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default TestForm;