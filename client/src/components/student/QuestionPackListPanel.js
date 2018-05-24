import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardDeck, CardTitle, CardText, Button } from 'reactstrap';
import _ from 'lodash';

import { fetchQuestionPacks } from '../../actions';

import { ROUTER_PACK } from '../../constants';

import NavBar from '../navbar/NavBar';

class QuestionPackListPanel extends Component {
    constructor(props) {
        super(props);

        this.renderQuestionPacks = this.renderQuestionPacks.bind(this);
    }

    componentWillMount() {
      this.props.fetchQuestionPacks();
    }

    renderQuestionPacks(questionPacks) {
        return _.chunk(_.values(questionPacks), 3).map((questionPackRows, index) => {
            return <Row key={index}>
                { questionPackRows.map((questionPack, index) => {
                    return (
                        <Col md="4" key={index}>
                            <Card body outline color="info">
                                <CardTitle>{questionPack.name}</CardTitle>
                                <CardText>Number of Questions: {questionPack.questions.length}</CardText>
                                <Link to={`${ROUTER_PACK}/${questionPack._id}`}>
                                    <Button color="success">Start</Button>
                                </Link>
                            </Card>
                        </Col>
                    );
                }) }
            </Row>;
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container className="question_pack_list">
                    { this.renderQuestionPacks(this.props.questionPackReducer) }
                </Container>
            </div>
        );
    }
}

function mapReducerToProps({ questionPackReducer }) {
    return { questionPackReducer };
}

const actions = {
  fetchQuestionPacks
}

export default connect( mapReducerToProps, actions )(QuestionPackListPanel);