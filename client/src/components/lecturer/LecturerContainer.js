import React, { Component } from 'react';

import SideBar from '../sidebar/SideBar';
import LecturerPanel from './LecturerPanel';

import { ROUTER_QUESTION, ROUTER_QUESTION_PACK, ROUTER_STUDENT_MANAGEMENT  } from '../../constants/urls';
 
class LecturerComtainer extends Component {
    render() {
        const sideBaritems = [
          {
            title: "Questions",
            image: <i className="fab fa-pied-piper"></i>,
            href: ROUTER_QUESTION
          },
          {
            title: "Packs",
            image: <i className="fas fa-archive"></i>,
            href: ROUTER_QUESTION_PACK
          },
          {
            title: "Students",
            image: <i className="fas fa-user"></i>,
            href: ROUTER_STUDENT_MANAGEMENT
          }
        ]
        return (
          <div className="h-100 d-flex">
            <SideBar items={sideBaritems} title="GMAT" />
            <LecturerPanel />
          </div>
        )
    }
}
 
 
export default LecturerComtainer;