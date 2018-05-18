import React, { Component } from 'react';
import { connect } from 'react-redux';

import QPackForm from './QPackForm';
import { addQuestionPack } from '../../actions';
 
class QPackAddPanel extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      name: "",
      questions: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(questionPack) {
    this.props.addQuestionPack(questionPack);
    this.props.history.goBack();
  }

  onCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="panel">
        <QPackForm 
          initialValues={this.initialValues}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
 
const actions = {
  addQuestionPack
};
 
export default connect(null, actions)(QPackAddPanel);