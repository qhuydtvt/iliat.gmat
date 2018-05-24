import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from 'reactstrap';

import QList from './QList';

import { searchQuestion } from '../../actions';

import "./QPackAddQuestionModal.css";

class QPackAddQuestionModal extends Component {

  constructor(props) {
    super(props);
    this.toggleQuestionSelection = this.toggleQuestionSelection.bind(this);
    this.clearQuestionSelections = this.clearQuestionSelections.bind(this);
    this.handleSearch = _.debounce(this.handleSearch, 300).bind(this);
    this.state = {
      questions: null
    };
  }
  
  componentWillMount() {
    searchQuestion("").payload.then((questions) => {
      this.setState({
        questions: questions
      });
    });
  }

  handleSearch(searchTerms) {
    searchQuestion(searchTerms).payload.then((questions) => {
      this.setState({
        questions: questions
      });
    });
  }

  toggleQuestionSelection(question) {
    this.setState({
      questions: {
        ...this.state.questions,
        [question._id]: {
          ...question,
          selected: !question.selected
        }
      }
    });
  }

  clearQuestionSelections() {
    this.setState({
      questions: _.mapValues(this.state.questions, (question) => {
        return { ...question, selected: false };
      })
    });
  }

  selectedQuestions() {
    return _.filter(this.state.questions, (question => question.selected));
  }

  renderQuestions(questions) {
    if (!questions) {
      return <div>Loading...</div>;
    }

    return (
      <div>
          <Input placeholder="Search here" onChange={(event) => this.handleSearch(event.target.value)}></Input>
          <div className="q-modal-scroll">
            <QList 
              questions={questions} 
              stimulusMaxLength={40} 
              onQuestionClicked={this.toggleQuestionSelection}
              pointer={true} 
            />
          </div>
          <div className="d-flex mt-2 justify-content-end">
            <Button color="secondary" onClick={this.props.toggle} >Cancel</Button>
            <Button 
              color="primary" className="ml-2"
              onClick={() => {
                this.props.onSelectionDone(this.selectedQuestions());
                this.props.toggle();
              }}>OK</Button>
          </div>
      </div>
    );
  }

  render() {
      const questions = this.state.questions;
      return (
        <Modal 
            isOpen={this.props.isOpen} 
            toggle={this.props.toggle}
            onOpened={this.clearQuestionSelections}
            size="md" >
          <ModalHeader>Add question</ModalHeader>
          <ModalBody>
            { this.renderQuestions(questions) }
          </ModalBody>
        </Modal>
      );
  }
}

export default QPackAddQuestionModal;