import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import Loading from '../common/Loading';

import { fetchResult } from '../../networks';
import { ROUTER_STUDENT, QUESTION_DIFFICULTIES } from '../../constants';

class ResultPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderResultTable = this.renderResultTable.bind(this);
        this.renderDifficulty = this.renderDifficulty.bind(this);
        this.renderQuestionType = this.renderQuestionType.bind(this);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        if(id) {
            fetchResult(id).then((result) => {
                this.setState({
                    result
                });
            });
        }
    }

    renderQuestionType(questionType) {
      switch(questionType) {
        case "CR":
          return "Critical Reasoning";
        default:
          return questionType;
      }
    }

    renderDifficulty(difficulty) {
        switch(difficulty) {
          case 0:
          case 1:
          case 2:
          case 3:
            return (<span>{QUESTION_DIFFICULTIES[difficulty].text}</span>);
          default: return (<span>Unknown</span>);
        }
    }

    renderResultTable() {
        const result = this.state.result;
        const answers = result.answers;
        const correctAnswerCount = answers.filter(e=>e.choice == e.question.rightChoice).length;
        const correctPercentage = answers.length ? parseFloat((correctAnswerCount/answers.length).toFixed(3)) : 0;
        return (
            <Col sm="12">
                <br />
                <h3>You answered { correctAnswerCount } out of {answers.length} ({correctPercentage}%) correctly.</h3>

                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th className="text-center">Order</th>
                            <th className="text-center">Question Type</th>
                            <th className="text-center">Difficulty</th>
                            <th className="text-center">Response</th>
                            <th className="text-center">Guess</th>
                            <th className="text-center">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            answers.map((answer, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">{ index + 1 }</th>
                                        <td className="text-center">Verbal / { this.renderDifficulty(answer.question.type) }</td>
                                        <td className="text-center">{ this.renderDifficulty(answer.question.difficulty) }</td>
                                        <td className="text-center">{ answer.choice == answer.question.rightChoice ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i> }</td>
                                        <td className="text-center"></td>
                                        <td className="text-center">{moment().startOf('day').seconds(answer.time).format(`${answer.time > 3600 ? 'H:mm:ss' : 'm:ss'}`)}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Col>
        );
    }
    
    render() {
      const result = this.state.result;
      if(!result) return (<Loading />);
      return (
          <Container className="result">
              <Row>
                  <Col sm="6">
                      <h2>Review your responses</h2>
                  </Col>
                  <Col sm="6" className="text-right">
                      <Button color="info" onClick={() => { this.props.history.push(ROUTER_STUDENT); }}>Back to Homepage</Button>
                  </Col>
              </Row>
              <Row>
                  {this.renderResultTable()}
              </Row>
          </Container>
      );
    }
}

export default ResultPanel;