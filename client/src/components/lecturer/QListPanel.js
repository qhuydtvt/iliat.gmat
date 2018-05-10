import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { openPopup, closePopup, removeQuestion, selectQuestion, editQuestion, addQuestion, fetchQuestions  } from '../../actions';
import QList from './QList';

import "./QPanel.css";

class QListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.modalToggle = this.modalToggle.bind(this);

    this.onDeleteRequest = this.onDeleteRequest.bind(this);
    this.onEditRequest = this.onEditRequest.bind(this);
    this.onAddRequest = this.onAddRequest.bind(this);
  }

  componentWillMount() {
    this.props.fetchQuestions();
  }

  modalToggle() {
    this.setState({
      ...this.state,
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  openModal() {
    this.setState({
      ...this.state,
      modalIsOpen: true
    });
  }

  onEditRequest(question) {
    const handleOK = (updatedQuestion) => this.props.editQuestion(updatedQuestion);
    const handleCancel = () => {};
    const handlers = { handleOK, handleCancel };
    this.props.selectQuestion(question, handlers, "Edit question");
    this.props.history.push("/lecturer/question/edit");
  }

  onAddRequest() {
    const handleOK = (addedQuestion) => { this.props.addQuestion(addedQuestion); };
    const handleCancel = () => {};
    const handlers = { handleOK, handleCancel };
    this.props.selectQuestion(null, handlers, "Add question");
    this.props.history.push('/lecturer/question/add')
  }

  onDeleteRequest(question) {
    const proceedDelete = () => {
      this.props.removeQuestion(question);
      this.props.closePopup();
    };
    this.props.openPopup(proceedDelete, null);
  }

  render() {
    return (
      <div>
        <Button 
          color="primary"
          className="add-button-right"
          onClick={this.onAddRequest}
          >
            Add new question
        </Button>
        <QList questions={this.props.questionReducer} onEditRequest={this.onEditRequest} onDeleteRequest={this.onDeleteRequest} />
      </div>
    );
  }
}

function mapReducerToProps( { questionReducer } ) {
  return { questionReducer };
}

const actions = {
  openPopup,
  closePopup,
  removeQuestion,
  selectQuestion,
  editQuestion,
  addQuestion,
  fetchQuestions
};

export default connect(mapReducerToProps, actions)(QListPanel);
