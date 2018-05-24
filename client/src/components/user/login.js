import React from 'react';
import { connect } from 'react-redux';
import { Col, Button, Form, Input, Container, FormGroup } from 'reactstrap';

import { login } from '../../actions';

import EditPanel from '../common/EditPanel';

import Loading from '../common/Loading';

class Login extends EditPanel {
  constructor(props) {
    super(props);
    
    this.state = {
      loggingIn: false
    };

    this.values = {
      username: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({
      loggingIn: true
    });
    this.props.login(this.values.username, this.values.password);
  }

  render() {
    if (this.state.loggingIn) {
      return <Loading />;
    }
    else {
      return this.renderLoginForm();
    }
  }

  renderLoginForm() {
    return (
      <Container className="d-flex align-items-center justify-content-center h-100">
        <Col md="4">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <label>Username</label>
              <Input onChange={this.inputToProp("values.username")} />
            </FormGroup>
            
            <FormGroup>
              <label>Password</label>
              <Input type="password" onChange={this.inputToProp("values.password")}/>
            </FormGroup>

            <FormGroup className="d-flex">
              <Button className="ml-auto" color="primary">Sign in</Button>
            </FormGroup>
          </Form>
        </Col>
      </Container>
    );
  }
}

const actions = {
  login
}

export default connect(null, actions)(Login);