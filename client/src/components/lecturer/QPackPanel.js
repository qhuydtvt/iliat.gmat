import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import QPackListPanel from './QPackListPanel';
import QPackEditPanel from './QPackEditPanel';
import { ROUTER_QUESTION_PACK, ROUTER_QUESTION_PACK_EDIT_OR_ADD } from '../../constants';
 
class QPackPanel extends Component {
  render() {
    return (
      <Switch>
        <Route path={ ROUTER_QUESTION_PACK_EDIT_OR_ADD } component={ QPackEditPanel } />
        <Route path={ ROUTER_QUESTION_PACK } component={ QPackListPanel } />
      </Switch>
    );
  }
}
 
export default QPackPanel;