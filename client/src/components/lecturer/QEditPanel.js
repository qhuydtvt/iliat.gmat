import React, { Component } from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import _ from 'lodash';

import { connect } from 'react-redux';
import { QUESTION_DIFFICULTIES, CHOICE_LETTERS } from '../../constants';

import QCRForm from './QCRForm';

import { editQuestion } from '../../actions';
import { fetchQuestion } from '../../networks';

import "./QEditPanel.css";
 
class QuestionEditPanel extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      question: null
    };
  }

  componentWillMount() {
    const questionId = this.props.match.params.id;
    fetchQuestion(questionId).then((question) => {
      this.setState({
        question
      });
    });
  }

  render() {
    if(!this.state.question) return (<div>Loading...</div>);
    
    return (
      <div>
        <h3>Edit question</h3>
        <QCRForm
          initialValues={this.state.question}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel} />
      </div>
    );
  }

  onSubmit(question) {
    this.props.editQuestion(question, this.props.history.goBack);
  }

  onCancel() {
    this.props.history.goBack();
  }
}

function mapReducerToProps({ questionReducer }) {
  return { questionReducer }
}

const actions = {
  editQuestion
};
 
export default connect(mapReducerToProps, actions)(QuestionEditPanel);