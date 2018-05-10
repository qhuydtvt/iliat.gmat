import _ from 'lodash';
import React from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import QPackQuestionListPanel from './QPackQuestionListPanel';

import EditPanel from '../common/EditPanel';

import './QPackEditPanel.css';
 
class QPackEditPanel extends EditPanel {
  constructor(props) {
    super(props);
    
    this.handleOK = (() => {
      this.state.handlers.handleOK(this.updateValues);
      this.props.history.goBack();
    });
    this.handleCancel = (() => this.state.handlers.handleCancel());

    this.state = {
      questionPack: null,
      handlers: null,
      title: ""
    }
  }

  componentWillMount() {
    const reducer = this.props.currentQuestionPackReducer;
    if(reducer) {
      this.setState({
        handlers: reducer.handlers,
        title: reducer.title
      });
      reducer.loadQuestionPack.then((questionPack) => {
        this.setState({
          questionPack
        });
        this.updateValues = _.cloneDeep(questionPack);
      });
    }
  }

  render() {
    const questionPack = this.state.questionPack;
   
    if(!questionPack) {
      return (
        <div className="panel">
          <h3>{ this.state.title }</h3>
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <div className="panel">
        <h3>{ this.state.title }</h3>
        <FormGroup>
          <legend>Name</legend>
          <Input defaultValue={ questionPack.name } onBlur={this.blurToProp("updateValues.name")}/>
        </FormGroup>
        <FormGroup>
          <QPackQuestionListPanel 
            defaultValue={questionPack.questions}
            questionsDidUpdate={this.assignToProp("updateValues.questions")}
          />
        </FormGroup>
        <FormGroup className="d-flex justify-content-end">
          <Button color="secondary mr-2" onClick={this.handleCancel} >Cancel</Button>
          <Button color="primary" onClick={this.handleOK} >OK</Button>
        </FormGroup>
      </div>
    );
  }
}

function mapReducerToProps({ currentQuestionPackReducer }) {
  return { currentQuestionPackReducer };
}
 
export default connect(mapReducerToProps)(QPackEditPanel);