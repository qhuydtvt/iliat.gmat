import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

import { logout } from '../../actions';

import Student from './student';
import Lecture from './lecture';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.state,confirmLogoutShow: false}

        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.toggleConfirmLogout = this.toggleConfirmLogout.bind(this);
    }

    onLogoutClick() {
        this.toggleConfirmLogout();
        this.props.logout();
        window.location.reload();
    }

    toggleConfirmLogout() {
        this.setState((prevState) => {return { ...this.state, confirmLogoutShow: !this.state.confirmLogoutShow }});
    }

    render() {
        return (
            <div>
                { this.props.authReducer.user.role === 'lecture' ? <Lecture /> : <Student /> }
                <Button color="danger" onClick={this.toggleConfirmLogout}>Logout</Button>
                <Modal size='sm' isOpen={this.state.confirmLogoutShow} toggle={this.toggleConfirmLogout} className={this.props.className}>
                    <ModalHeader toggle={this.toggleConfirmLogout}>Log out</ModalHeader>
                    <ModalBody className="text-center">
                        Are you sure?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onLogoutClick}>Ok</Button>
                        <Button color="secondary" onClick={this.toggleConfirmLogout}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps({ authReducer }) {
    return { authReducer };
}

export default connect(mapStateToProps, { logout })(Main);