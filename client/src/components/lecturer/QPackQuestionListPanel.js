import React, { Component } from 'react';
import { FormGroup, Button } from 'reactstrap';
import _ from 'lodash';

import { elipsis } from '../../utils';

import QPackAddQuestionModal from './QPackAddQuestionModal';

import './QPackQuestionListPanel.css';

class QPackQuestionListPanel extends Component {
    constructor(props) {
      super(props);
      this.removeQuestion = this.removeQuestion.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.onNewQuestionsSelectionDone = this.onNewQuestionsSelectionDone.bind(this);
    }

    componentWillMount() {
      this.setState({
        questions: _.cloneDeep(this.props.defaultValue),
        modalIsOpen: false
      });
    }

    componentDidUpdate(prevProps, prevState) {
      this.props.questionsDidUpdate(this.state.questions);
    }

    openModal() {
      this.setState({
        modalIsOpen: true
      });
    }

    closeModal() {
      this.setState({
        modalIsOpen: false
      });
    }

    removeQuestion(removeIndex) {
      const newQuestions = this.state.questions.filter((question, index) => index !== removeIndex);
      this.setState({
        questions: newQuestions
      });
    }

    onNewQuestionsSelectionDone(newQuestions) {
      const questions = this.state.questions;
      const difference = _.filter(newQuestions, (newQuestion, id) => {
        return !_.find(questions, {'id': newQuestion.id});
      });
      this.setState({
        questions: _.concat(questions, difference)
      });
      this.closeModal();
    }

    render() {
      const questions = this.state.questions;
      return (
        <div>
          <QPackAddQuestionModal 
            isOpen={this.state.modalIsOpen}
            toggle={this.closeModal}
            onSelectionDone={this.onNewQuestionsSelectionDone}
          />
          <div className="d-flex align-items-center justify-content-between mt-3">
            <span className="legend" >Questions</span>
            <Button size="sm" color="secondary" className="ml-2" onClick={this.openModal}>Add questions</Button>
          </div>
          <FormGroup>
            {
              questions.map((question, index) => this.renderQuestion(question, index))
            }
          </FormGroup>
        </div>
      );
    }

    renderQuestion(question, index) {
      return (
        <FormGroup key={index} className="question-wrapper">
          <span className="question-no">{parseInt(index, 10) + 1}.</span>
          <span className="question-stimulus">{elipsis(question.stimulus)}</span>
          <i 
            className="fas fa-times ml-2 text-danger pointer question-remove"
            onClick={ () => this.removeQuestion(parseInt(index, 10)) }
            >
          </i>
        </FormGroup>
      )
    }
}
 
export default QPackQuestionListPanel;