import React, { Component } from 'react';
import  { withFormik, Formik } from 'formik';
import { Form, FormGroup, Input } from 'reactstrap';
import ReactQuill from 'react-quill';
import { CHOICE_LETTERS } from '../../constants';

import Choice from './choice';

import 'react-quill/dist/quill.snow.css';
import './QForm.css';

class QSCForm extends Component {
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
    
    if (details.length == 0) return <div>Initial values were not set</div>;

    const { stem, choices, rightChoice, explanation } = details[0];

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <legend>Stem</legend>
          <ReactQuill
            className='quill'
            theme='snow'
            name='stem'
            value={stem}
            onChange={(html) => {
              setFieldValue('details[0].stem', html);
              setFieldTouched('details[0].stem', true);
            }}
            onBlur={() => validateForm(values)}
          />
        </FormGroup>

        <FormGroup>
          <legend>Choices</legend>
          {
            choices.map((choice, index) => {
              return (<Choice
                        choiceLetter={CHOICE_LETTERS[index]}
                        value={choice}
                        name={`details[0].choices[${index}]`}
                      />);
            })
          }
        </FormGroup>
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default QSCForm;