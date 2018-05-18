import _ from 'lodash';
import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Formik, FieldArray, Field } from 'formik';
import { elipsis } from '../../utils';
import QPackAddQuestionModal from './QPackAddQuestionModal';

class QPackForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false,
      onSelectNewQuestionsDone: null
    };
  }

  validate(values) {
    const errors = {};
    if(!values.name) {
      errors.name = "Name required";
    }
    return errors;
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
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
      setFieldValue
    } = formProps;

    const {name, questions} = values;

    return (
      <Form onSubmit={handleSubmit}>
        <QPackAddQuestionModal
          isOpen={this.state.modalIsOpen}
          toggle={this.closeModal}
          onSelectionDone={this.state.onSelectNewQuestionsDone}
        />
        <FormGroup>
          <legend>Name</legend>
          <Input 
            name="name"
            type="text"
            invalid={touched.name && errors.name != null}
            value={name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{ touched.name? errors.name: "" }</div>
        </FormGroup>

        <FormGroup>
          <FieldArray 
            name="questions"
            render={ arrayHelpers => (
              <div>
                <div className="d-flex justify-content-between">
                  <legend>Questions</legend>
                  <Button color="secondary" onClick={()=> {
                    this.setState({
                      modalIsOpen: true,
                      onSelectNewQuestionsDone: (selectedQuestions) => {
                        const resultArray = questions.slice(0);
                        selectedQuestions.forEach(selectedQuestion => {
                          if(!_.find(questions, { _id: selectedQuestion._id })) {
                            resultArray.push(selectedQuestion);
                          }
                        });
                        // Can't use array helper yet :'(
                        setFieldValue("questions", resultArray);
                      }
                    });
                  }}>Add questions</Button>
                </div>
                {
                  questions.map((question, index) => (
                    <div key={index} className="my-2 d-flex align-items-center">
                      <span className="mr-2">{index + 1}.</span>
                      <Input disabled={true} value={elipsis(question.stimulus)} className="col"/>
                      <i 
                        className="fas fa-times ml-2 text-danger pointer question-remove"
                        onClick={() => {arrayHelpers.remove(index)}}
                      />
                    </div>
                  ))
                }
              </div>
            ) }
          />
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color="seconary" onClick={this.props.onCancel}>Cancel</Button>
          <Button color="primary" className="ml-2">OK</Button>
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

export default QPackForm;