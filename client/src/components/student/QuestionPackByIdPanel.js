import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label, TabContent, TabPane } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import { fetchQuestion } from '../../networks';

import { checkAnswers } from '../../actions';

import { ROUTER_RESULT } from '../../constants';

class QuestionPackByIdPanel extends Component {
    constructor(props) {
      super(props);

      this.state = {
          ...this.state,
          isPause: false,
          totalTime: 0,
          timeSpentOnCurrentQuestion: 0,
          currentQuestionIndex: 0,
          userChoice: -1,
          finished: false
      };

      this.answers = [];

      this.renderTabsQuestion = this.renderTabsQuestion.bind(this);
      this.renderChoices = this.renderChoices.bind(this);
      this.handleSelectChoice = this.handleSelectChoice.bind(this);
      this.backToPpreviousQuestion = this.backToPpreviousQuestion.bind(this);
      this.goToNextQuestion = this.goToNextQuestion.bind(this);
      this.submitChoice = this.submitChoice.bind(this);
      this.clearChoice = this.clearChoice.bind(this);
      this.submitTest = this.submitTest.bind(this);
      this.handlePause = this.handlePause.bind(this);
    }

    componentWillMount() {
      const id = this.props.match.params.id;
      if(id) {
        fetchQuestion(id).then((questionPack) => {
          this.setState({
            questionPack
          });
          this.startTimer();
        });
      }
    }

    startTimer() {
      this.timer = setInterval(()=>{
        if(!this.state.isPause) {
            this.setState({
                ...this.state,
                totalTime: this.state.totalTime + 1,
                timeSpentOnCurrentQuestion: this.state.timeSpentOnCurrentQuestion + 1
            });
        }
      }, 1000);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.resultReducer.result) {
            this.props.history.push(ROUTER_RESULT);
        }
    }

    submitTest() {
      clearInterval(this.timer);
      this.props.checkAnswers(
        this.state.questionPack,
        this.answers,
        this.state.totalTime);
      this.props.history.push(ROUTER_RESULT);
    }

    submitChoice() {
      this.saveUserChoice();
      if(this.currentQuestionIsLast()) {
          this.submitTest();
      } else {
          this.goToNextQuestion();
      }
    }

    currentQuestionIsLast() {
      return this.state.currentQuestionIndex === this.state.questionPack.questions.length - 1;
    }

    clearChoice() {
      this.setState({
        userChoice: -1
      });
    }

    handleSelectChoice(index) {
      this.setState({
        userChoice: index
      });
    }

    renderChoices(questionId, choices) {
      return choices.map((choice, index) => {
        return (
          <FormGroup key={index} check>
            <Label check>
            <Input checked={index == this.state.userChoice} type="radio" name={questionId} value={index} 
              onChange={(e) => { this.handleSelectChoice(index) }} />{' '}
              {choice}
            </Label>
          </FormGroup>
        );
      });
    }

    renderTabsQuestion() {
        const questionPack = this.state.questionPack;
        const userChoice = this.state.userChoice;
        if (!questionPack) return (<div>Loading ...</div>);
        if(!questionPack.questions || questionPack.questions.length == 0) return (<div>This pack does not have any questions</div>);
        return (
          questionPack.questions.map((question, index) => {
            return (
              <TabPane tabId={`${index}`} key={index}>
              <Row>
                <Col sm="12">
                  <Form onSubmit={this.submitChoice}>
                    <p>{question.stimulus}</p>
                    <p>{question.stem}</p>
                    <FormGroup check row>
                      { this.renderChoices(question.id, question.choices) }
                    </FormGroup>
                    <FormGroup check row className="form_menu">
                      <Button onClick={this.submitChoice} className="btn-success" disabled={ userChoice === -1 }>Submit</Button>
                      <div>
                          <Button onClick={() => { this.clearChoice() }}>Clear answer</Button>
                          <Button>Show answer</Button>
                      </div>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </TabPane>
            );
          })
        );
    }

    backToPpreviousQuestion() {
      if(this.state.questionPack && this.state.currentQuestionIndex > 0) {
        this.setState({
          ...this.state,
          currentQuestionIndex: this.state.currentQuestionIndex - 1
        });
      }
    }

    goToNextQuestion() {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        userChoice: -1,
        timeSpentOnCurrentQuestion: 0
      });
    }

    saveUserChoice() {
      this.answers = [
        ...this.answers, 
        {
          userChoice: this.state.userChoice,
          questionId: this.currentQuestion()._id,
          time: this.state.timeSpentOnCurrentQuestion
        }
      ];
    }

    currentQuestion() {
      return this.state.questionPack.questions[this.state.currentQuestionIndex];
    }

    handlePause() {
      this.setState({
        ...this.state,
        isPause: !this.state.isPause
      });
    }

    render() {
        const questionPack = this.state.questionPack;
        if(!questionPack) return (<div>Loading ...</div>);
        return (
            <Container fluid className={`question_pack ${this.state.isPause ? "pause" : ""}`}>
                <Row>
                    <Container>
                        <Col sm={{ size: 6, offset: 6 }} className="btn_menu_top">
                            <Button color="info" onClick={this.backToPpreviousQuestion} disabled={this.state.questionPackId && this.state.questionPack ? this.state.isPause || this.state.currentQuestionIndex <= 0 : true}>Back</Button>
                            <Button color="info" onClick={this.handlePause}>{ this.state.isPause ? "Resume" : "Pause" }</Button>
                            <Button color="info" onClick={this.goToNextQuestion} disabled={this.state.questionPackId && this.state.questionPack ? this.state.isPause || this.state.currentQuestionIndex + 1 >= this.state.questionPack.questions.length : true}>Skip</Button>
                            <Button color="info" onClick={this.submitTest} disabled={this.state.isPause}>Finish</Button>
                        </Col>
                    </Container>
                </Row>
                { this.state.isPause ? <Row className="pause_overlay"><Button color="info" onClick={this.handlePause}>Click to resume</Button></Row> : null }
                <Row>
                    <Container>
                        <TabContent activeTab={`${this.state.currentQuestionIndex}`}>
                            {this.renderTabsQuestion()}
                        </TabContent>
                    </Container>
                </Row>
                <Row>
                    <Container>
                        <Col md="4" className="text-left">Time spent on this question: </Col>
                        <Col md="4" className="text-center">{`${this.state.currentQuestionIndex + 1}/${this.state.questionPack.questions ? this.state.questionPack.questions.length : 0}`}</Col>
                        <Col md="4" className="text-right">Question set total time: {moment().startOf('day').seconds(this.state.totalTime).format('H:mm:ss')}</Col>
                    </Container>
                </Row>
            </Container>
        );
    }
}

export default connect(null, { checkAnswers })(QuestionPackByIdPanel);