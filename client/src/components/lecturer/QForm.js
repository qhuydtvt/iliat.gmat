import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { withFormik, Formik } from 'formik';
import { deEmpty, stripHTML } from '../../utils';
import { Form, Input, Label, Button, FormGroup } from 'reactstrap';
import { QUESTION_DIFFICULTIES, CHOICE_LETTERS } from '../../constants';

import 'react-quill/dist/quill.snow.css';
import './QForm.css';

class QForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.question = this.props.question ? this.props.question : 
      {
        stimulus: "",
        stem: "",
        choices: ["", "", "", "", ""],
        rightChoice: 0,
        difficulty: 0,
        explanation: "",
      };
  }

  validate(values) {
    const errors = {};
    if(!stripHTML(values.stimulus)) {
      errors.stimulus = "Stimulus required";
    }
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
      setFieldValue,
      setFieldTouched,
      validateForm
    } = formProps;

    const stimulus = deEmpty(values.stimulus);
    const stem = deEmpty(values.stem);
    const choices = deEmpty(values.choices, []);
    const rightChoice = deEmpty(values.rightChoice);
    const explanation = deEmpty(values.explanation);
    const difficulty = deEmpty(values.difficulty, 0); 

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
            onBlur={() => validateForm(values)}
           />
          <div className="text-danger" >{ touched.stimulus ? errors.stimulus : "" }</div>
        </FormGroup>

        <FormGroup>
          <legend>Stem</legend>
          <ReactQuill
            className="quill"
            theme="snow"
            name="stem"
            value={stem}
            onChange={(html) => {
              setFieldValue("stem", html);
              setFieldTouched("stem", true);
            }}
            onBlur={() => validateForm(values)}
           />
          <div className="text-danger" >{ touched.stem ? errors.stem : "" }</div>
        </FormGroup>

        <FormGroup>
          <legend>Choices</legend>
          {CHOICE_LETTERS.map((choiceLetter, index) => {
            return (
              <div className="choice-input-wrapper mt-2" key={index}>
                <span>{ CHOICE_LETTERS[index] }.</span>
                <Input
                  type="text"
                  name={`choices[${index}]`}
                  value={deEmpty(choices[index])}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </FormGroup>
          
        <FormGroup>
          <legend>Right choice</legend>
          <Input
            type="select"
            name="rightChoice"
            value={rightChoice}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            {CHOICE_LETTERS.map((choiceLetter, index) => {
              return (
                <option key={index} value={index}> {choiceLetter} </option>
              );
            })}
          </Input>
        </FormGroup>

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
        initialValues={this.question}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      /> 
    );
  }
}

export default QForm;