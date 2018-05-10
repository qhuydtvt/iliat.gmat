import { Navbar, Nav, NavItem, Collapse, NavbarBrand, NavbarToggler, NavLink  }  from 'reactstrap';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { logout } from '../../actions';

import './NavBar.css';
 
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="bg-blue" expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={this.props.logout} >Sign out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const actions = {
  logout
};
 
 
export default connect(null, actions)(NavBar);