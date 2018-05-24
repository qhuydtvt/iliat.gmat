import React, { Component } from 'react';
import  { withFormik, Formik } from 'formik';
import { Form } from 'reactstrap'

import QDetailForm from '../lecturer/qDetail.form';
import { nestedFormikProps } from '../nestedFormik';

class TestQDetail extends Component {
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
    
    const { details } = values;
    // console.log(values);
    // console.log(nestedFormikProps(formProps, `details[0]`));
    return (
      <Form onSubmit={handleSubmit}
      >
      {
        details.map((_, index) => {
          return <QDetailForm key={index} {...nestedFormikProps(formProps, `details[${index}]`)} />
        })
      }
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={{
          stem: "stem",
          stimulus: "stimulus",
          details: [
            {
              stem: "detail stem",
              highlightStimulus: "highlight stimulus",
              rightChoice: 1,
              choices: ["AA", "BB", "CC", "DD"]
            },
            {
              stem: "detail stem",
              rightChoice: 1,
              choices: ["AA", "BB", "CC", "DD"]
            }
          ]
        }}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default TestQDetail;