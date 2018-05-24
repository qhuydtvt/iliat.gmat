import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import QListPanel from './QListPanel';
import QuestionEditPanel from './QuestionEditPanel';

import './QuestionPanel.css';

import { ROUTER_QUESTION_EDIT_OR_ADD, ROUTER_QUESTION } from '../../constants';

class QuestionPanel extends Component {
  render() {
    return (
      <div className="question-panel">
        <Switch>
          <Route path={ROUTER_QUESTION_EDIT_OR_ADD} component= { QuestionEditPanel } />
          <Route path={ROUTER_QUESTION} component={ QListPanel } />
        </Switch>
      </div>
    );
  }
}

export default QuestionPanel;
