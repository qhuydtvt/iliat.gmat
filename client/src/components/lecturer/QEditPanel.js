import React from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import _ from 'lodash';

import { connect } from 'react-redux';
import { QUESTION_DIFFICULTIES, CHOICE_LETTERS } from '../../constants';
import { editQuestion } from '../../actions';

import EditPanel  from '../common/EditPanel';

import "./QEditPanel.css";
 
class QuestionEditPanel extends EditPanel {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        handlers: null,
        question: null
      };
      this.onCancel = this.onCancel.bind(this);
      this.onOK = this.onOK.bind(this);
    }

    componentWillMount() {
      const reducer = this.props.currentQuestionReducer;
      if(reducer && reducer.loadQuestion) {
        this.setState({
          title: reducer.title,
          handlers: reducer.handlers
        });

        reducer.loadQuestion.then((question) => {
          this.updateValues = _.cloneDeep(question);
          this.setState({
            question
          });
        })
      }
    }

    render() {
      return (
        <div>
          <h3>{this.state.title}</h3>
          { this.renderForm() }
        </div>
      );
    }

    renderForm() {
      const question = this.state.question;

      if(!question) {
        return (
          <div>Loading ...</div>
        );
      }
      
      return (
        <div>
          <FormGroup>
            <legend>Stimulus</legend>
            <Input type="textarea" defaultValue={question.stimulus} onBlur={this.blurToProp("updateValues.stimulus")}></Input>
          </FormGroup>
          <FormGroup>
            <legend>Stem</legend>
            <Input type="text" defaultValue={ question.stem } onBlur={this.blurToProp("updateValues.stem")}></Input>
          </FormGroup>
          <FormGroup>
            <legend>Choices</legend>
            { this.renderChoicesInForm(question) }
          </FormGroup>
          <FormGroup>
            <legend>Right choice</legend>
            { this.renderRightChoiceInForm(question) }
          </FormGroup>
          <FormGroup>
            <legend>Explanation</legend>
            <Input type="textarea" defaultValue={question.explanation} onBlur={this.blurToProp("updateValues.explanation")}></Input>
          </FormGroup>
          <FormGroup>
            <legend>Difficulty level</legend>
            { this.renderDifficulty(question) }
          </FormGroup>
          <FormGroup className="clearfix float-right">
            <Button onClick={this.onCancel} >Cancel</Button>
            <Button onClick={this.onOK} className="ml-1" color="primary">OK</Button>
          </FormGroup>
        </div>
      );
    }

    renderChoicesInForm(question) {
      return question.choices.map((choice, index) => {
        return (
          <div className="choice-input-wrapper" key={ index }>
            <span>{ CHOICE_LETTERS[index] }. </span>
            <Input className="mb-1" key={index} defaultValue={choice} onBlur={this.blurToProp(`updateValues.choices[${index}]`)} ></Input>
          </div>
        );
      });
    }

    renderRightChoiceInForm(question) {
      const choices = ['A', 'B', 'C', 'D', 'E'];
      return (
        <Input type="select" defaultValue={question.rightChoice} onBlur={this.blurToProp("updateValues.rightChoice")}>
          {choices.map((choice, index) => {
            return (
              (<option key={index} value={index}> {choice} </option>)
            );
          })}
        </Input>
      );
    }
    
    renderDifficulty(question) {
      return (
        <Input type="select" defaultValue={question.difficulty} onBlur={this.blurToProp("updateValues.difficulty", parseInt)}>
          {QUESTION_DIFFICULTIES.map((questionDifficulty, index) => {
            return (<option key={questionDifficulty.value} value={questionDifficulty.value}>{ questionDifficulty.text }</option>);
          })}
        </Input>
      );
    }

    onCancel() {
      this.state.handlers.handleCancel();
      this.props.history.goBack();
    }

    onOK() {
      this.state.handlers.handleOK(this.updateValues);
      this.props.history.goBack();
    }
}

function mapReducerToProps({ currentQuestionReducer }) {
  return { currentQuestionReducer }
}

const actions = {
  editQuestion
};
 
export default connect(mapReducerToProps, actions)(QuestionEditPanel);