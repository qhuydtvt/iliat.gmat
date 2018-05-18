import _ from 'lodash';
import React, { Component } from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import QPackQuestionListPanel from './QPackQuestionListPanel';

import QPackForm from './QPackForm';

import { editQuestionPack } from '../../actions';
import { fetchQuestionPack  } from '../../networks';
 
class QPackEditPanel extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      questionPack: null,
      title: ""
    }
  }

  componentWillMount() {
    const questionPackId = this.props.match.params.id;
    fetchQuestionPack(questionPackId).then((questionPack) => {
      this.setState({
        questionPack
      });
    });
  }

  onSubmit(questionPack) {
    this.props.editQuestionPack(questionPack);
    this.props.history.goBack();
  }

  onCancel() {
     this.props.history.goBack();
  }

  render() {
    if(!this.state.questionPack) return <div>Loading...</div>;
    return (
      <div className="panel">
        <h3>Edit panel</h3>
        <QPackForm
          initialValues={this.state.questionPack}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
 
const actions = {
  editQuestionPack
};

export default connect(null, actions)(QPackEditPanel);