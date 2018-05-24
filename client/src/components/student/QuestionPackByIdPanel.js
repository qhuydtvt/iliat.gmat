import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label, TabContent, TabPane } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import progressBar, { Circle } from 'react-progressbar';

import { fetchQuestionPack, addResult } from '../../networks';

import Loading from '../common/Loading';

import { ROUTER_RESULT } from '../../constants';

class QuestionPackByIdPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        ...this.state,
        isPause: false,
        totalTime: 0,
        idealTimeSpentPerQuestion: 108,
        currentQuestionIndex: 0,
        userChoice: -1,
        finished: false
    };

    this.answers = [];

    this.renderTabsQuestion = this.renderTabsQuestion.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.handleSelectChoice = this.handleSelectChoice.bind(this);
    this.backToPreviousQuestion = this.backToPreviousQuestion.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.submitChoice = this.submitChoice.bind(this);
    this.clearChoice = this.clearChoice.bind(this);
    this.submitTest = this.submitTest.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.renderQuestionType = this.renderQuestionType.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    if(id) {
      fetchQuestionPack(id).then((questionPack) => {
        this.answers = [{
          choice: -1,
          question: questionPack.questions[0]._id,
          time: 0
        }];

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
          if(this.answers[this.state.currentQuestionIndex]) this.answers[this.state.currentQuestionIndex].time += 1;
          this.setState({
              ...this.state,
              totalTime: this.state.totalTime + 1
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
    let newResult = {
      answers: this.answers,
      questionPack: this.state.questionPack._id
    }
    addResult(newResult).then((resultId) => {
      this.props.history.push(`${ROUTER_RESULT}/${resultId}`);
    });
  }

  submitChoice() {
    this.saveUserChoice(this.state.currentQuestionIndex, this.currentQuestion()._id, this.state.userChoice);
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

  renderQuestionType(questionType) {
    switch(questionType) {
      case "CR":
        return "Critical Reasoning";
      default:
        return questionType;
    }
  }

  renderTabsQuestion() {
    const questionPack = this.state.questionPack;
    const userChoice = this.state.userChoice;
    if (!questionPack) return (<Loading />);
    if(!questionPack.questions || questionPack.questions.length == 0) return (<div>This pack does not have any questions</div>);
    return (
      questionPack.questions.map((question, index) => {
        return (
          <TabPane tabId={`${index}`} key={index}>
            <Row>
              <Col sm="12">
                <Form onSubmit={this.submitChoice}>
                  <div className="question_title">
                    Verbal :: {this.renderQuestionType(question.type)} :: {question._id}
                  </div>
                  <div>
                    <p dangerouslySetInnerHTML={{ __html: question.stimulus}}></p>
                    <p dangerouslySetInnerHTML={{ __html: question.stem}}></p>
                    { this.renderChoices(question.id, question.choices) }
                    <FormGroup check className="guess_chkbox">
                      <Label check>
                        <Input type="checkbox" />{' '}
                        This is a guess
                      </Label>
                    </FormGroup>
                    <FormGroup className="form_menu">
                      <Button onClick={this.submitChoice} className="btn-success" disabled={ userChoice === -1 }>Submit</Button>
                      <div>
                        <div>
                          <Button onClick={() => { this.clearChoice() }}>Clear answer</Button>
                          <Button disabled={ userChoice === -1 }>Show answer</Button>
                        </div>
                        <Button><i className="far fa-star"></i> Bookmark this question</Button>
                      </div>
                    </FormGroup>
                  </div>
                </Form>
              </Col>
            </Row>
          </TabPane>
        );
      })
    );
  }

  backToPreviousQuestion() {
    if(this.state.questionPack && this.state.currentQuestionIndex > 0) {
      this.setState({
        ...this.state,
        currentQuestionIndex: this.state.currentQuestionIndex - 1,
        userChoice: this.answers[this.state.currentQuestionIndex - 1].userChoice
      });
    }
  }

  goToNextQuestion() {
    let nextQuestion = this.answers[this.state.currentQuestionIndex + 1];
    if(!nextQuestion) {
      this.answers.push({
        question: this.state.questionPack.questions[this.state.currentQuestionIndex + 1]._id,
        choice: -1,
        time: 0
      });
    }
    
    this.setState({
      ...this.state,
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      userChoice: nextQuestion ? nextQuestion.userChoice : -1
    });
  }

  saveUserChoice(questionIndex, questionId, userChoice) {
    this.answers[questionIndex].question = questionId;
    this.answers[questionIndex].choice = userChoice;
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
    const isPause = this.state.isPause;
    const currentQuestionIndex = this.state.currentQuestionIndex;
    const currentQuestion = this.answers[currentQuestionIndex];
    if(!questionPack && !this.state.finished) return (<Loading />);
    return (
      <Container fluid className={`question_pack ${isPause ? "pause" : ""}`}>
        <Row>
          <Container>
            <Col sm={{ size: 6, offset: 6 }} className="btn_menu_top">
              <Button color="info" onClick={this.backToPreviousQuestion} disabled={isPause || currentQuestionIndex <= 0}>Back</Button>
              <Button color="info" onClick={this.handlePause}>{ isPause ? "Resume" : "Pause" }</Button>
              <Button color="info" onClick={this.goToNextQuestion} disabled={isPause || currentQuestionIndex + 1 >= questionPack.questions.length}>Skip</Button>
              <Button color="info" onClick={this.submitTest} disabled={isPause}>Finish</Button>
            </Col>
          </Container>
        </Row>
        { isPause ? <Row className="pause_overlay"><Button color="info" onClick={this.handlePause}>Click to resume</Button></Row> : null }
        <Row>
          <Col sm="12">
            <Container>
              <TabContent activeTab={`${currentQuestionIndex}`}>
                {this.renderTabsQuestion()}
              </TabContent>
            </Container>
          </Col>
        </Row>
        <Row>
          <Container>
            <Col md="4" className={`text-left ${currentQuestion.time < this.state.idealTimeSpentPerQuestion ? 'green_text' : 'red_text'}`}><span>Time spent on this question:</span> <span>{moment().startOf('day').seconds(currentQuestion.time).format(`${currentQuestion.time > 3600 ? 'H:mm:ss' : 'm:ss'}`)}</span> </Col>
            <Col md="4" className="text-center">{`Question ${currentQuestionIndex + 1}/${questionPack.questions ? questionPack.questions.length : 0}`}</Col>
            <Col md="4" className={`text-right ${currentQuestion.time < this.state.idealTimeSpentPerQuestion*questionPack.questions.length ? 'green_text' : 'red_text'}`}><span>Question set total time:</span> <span>{moment().startOf('day').seconds(this.state.totalTime).format(`${this.state.totalTime > 3600 ? 'H:mm:ss' : 'm:ss'}`)}</span> </Col>
          </Container>
        </Row>
      </Container>
    );
  }
}

export default QuestionPackByIdPanel;
