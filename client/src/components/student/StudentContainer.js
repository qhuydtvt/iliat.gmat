import React, { Component } from 'react';
import { Container } from 'reactstrap';

import StudentPanel from './StudentPanel';
import NavBar from '../navbar/NavBar';

class StudentContainer extends Component {
    render() {
      return (
        <div>
          <NavBar />
          <StudentPanel />
        </div>
        
      );
    }
}

export default StudentContainer;