import React, { Component } from 'react';
import  { withFormik, Formik } from 'formik';
import { Input, Label, Form, FormGroup, Button } from 'reactstrap';

import {nestedFormikProps, nestedFormikValidate} from '../nestedFormik';
import InnerForm, { validate as innerValidate } from './Inner.form';


class NestedForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
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

    const { type, post } = values;

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Type</Label>
          <Input
            name='type'
            value={type}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <InnerForm
          {...nestedFormikProps(formProps, "post")}
        />
        <Button color="primary">OK</Button>
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        validate={(values) => {
          return {
            ...this.validate(values),
            ...nestedFormikValidate(innerValidate, "post")(values)
        }}}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default NestedForm;