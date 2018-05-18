import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import QPackListPanel from './QPackListPanel';
import QPackEditPanel from './QPackEditPanel';
import { ROUTER_QUESTION_PACK, ROUTER_QUESTION_PACK_EDIT_WITH_PARAM, ROUTER_QUESTION_PACK_ADD } from '../../constants';
import QPackAddPanel from './QPackAddPanel';
 
class QPackPanel extends Component {
  render() {
    return (
      <Switch>
        <Route path={ ROUTER_QUESTION_PACK_ADD } component={ QPackAddPanel } />
        <Route path={ ROUTER_QUESTION_PACK_EDIT_WITH_PARAM } component={ QPackEditPanel } />
        <Route path={ ROUTER_QUESTION_PACK } component={ QPackListPanel } />
      </Switch>
    );
  }
}
 
export default QPackPanel;