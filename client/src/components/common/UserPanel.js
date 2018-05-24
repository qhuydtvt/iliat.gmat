import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { logout, fetchUserInfo } from '../../actions';

class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        this.props.fetchUserInfo();
    }

    componentWillReceiveProps(newProps) {
        if(!newProps.authReducer.isLoggedIn) {
            this.props.history.push("");
        }
    }

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <div className="user_panel">
                <Col sm="12" className="text-right">
                    <h3>Hi, {this.props.authReducer.user ? this.props.authReducer.user.username : ''}.</h3>
                    <Button color="danger" onClick={this.logout}>Logout</Button>
                </Col>
            </div>
        );
    }
}

function mapReducerToState({ authReducer }) {
    return { authReducer };
}

const actions = {
    logout,
    fetchUserInfo
};
 
export default connect(mapReducerToState, actions)(UserPanel);