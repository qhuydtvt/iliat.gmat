import _ from 'lodash';
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Formik } from 'formik';
import { deEmpty, stripHTML } from '../../utils';
import { Form, Button, FormGroup } from 'reactstrap';
import QuestionDetail, { validate as questionDetailValidate } from './qDetail.form';

import { nestedFormikProps, nestedFormikValidate } from '../nestedFormik';

import 'react-quill/dist/quill.snow.css';
import './QForm.css';

class QCRForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    let errors = {};

    if(!stripHTML(values.stimulus)) {
      errors.stimulus = "Stimulus required";
    }
    
    values.details.forEach((detail, index) => {
      errors = {
        ...errors,
        ...nestedFormikValidate(questionDetailValidate, `details.${index}`)(values)
      }
    })
    
    return errors;
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      validateForm
    } = formProps;

    const stimulus = deEmpty(values.stimulus);

    return (
      <Form onSubmit={handleSubmit} >
        <FormGroup>
          <legend>Stimulus</legend>
          <ReactQuill
            className="quill"
            theme="snow"
            name="stimulus"
            value={stimulus}
            onChange={(html) => {
              setFieldValue("stimulus", html);
              setFieldTouched("stimulus", true);
            }}
            onBlur={() => {
              validateForm(values);
              setFieldTouched("stimulus", true);
            }}
           />
          <div className="text-danger" >{ touched.stimulus ? errors.stimulus : "" }</div>
        </FormGroup>
        
        { 
          values.details.map((_, index) => {
            return <QuestionDetail
                      key={index}
                      custom={{
                        allowStimulus: false
                      }}
                      {...nestedFormikProps(formProps, `details.${index}`)}
                    />
          })
        } 
        
        <div className="d-flex justify-content-end">
          <Button className="mb-2" color="secondary" onClick={this.props.onCancel}>Cancel</Button>
          <Button className="mb-2 ml-2" color="primary">Submit</Button>
        </div>
        
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

export default QCRForm;