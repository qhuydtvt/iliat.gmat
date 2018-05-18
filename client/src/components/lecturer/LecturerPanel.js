import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import QPanel from './QPanel';
import QPackPanel from './QPackPanel';
import NavBar from '../navbar/NavBar';

import { ROUTER_QUESTION_PACK, ROUTER_QUESTION } from '../../constants';
 
class LecturerPanel extends Component {
    render() {
        return (
          <div className="w-100 full-height">
            <NavBar/>
            <Switch>
              <Route path={ROUTER_QUESTION} component={QPanel} />
              <Route path={ROUTER_QUESTION_PACK} component={QPackPanel} />
            </Switch>
          </div>
        )
    }
}
 
 
export default LecturerPanel;