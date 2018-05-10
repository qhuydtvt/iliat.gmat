import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import QListPanel from './QListPanel';
import QEditPanel from './QEditPanel';

import './QPanel.css';

import { ROUTER_QUESTION_EDIT_OR_ADD, ROUTER_QUESTION } from '../../constants';

class QuestionPanel extends Component {
  render() {
    return (
      <div className="question-panel full-height">
        <Switch>
          <Route path={ROUTER_QUESTION_EDIT_OR_ADD} component= { QEditPanel } />
          <Route path={ROUTER_QUESTION} component={ QListPanel } />
        </Switch>
      </div>
    );
  }
}

export default QuestionPanel;
