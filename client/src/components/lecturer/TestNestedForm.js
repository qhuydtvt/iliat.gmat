import React, { Component } from 'react';
import NestedForm from './Nested.form';
 
class TestNestedForm extends Component {
  constructor(props) {
    super(props);
    this.values = {
      type: "CR",
      post: {
        title: "Hehe",
        content: "Hihi"
      }
    };
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <NestedForm 
        initialValues={this.values}
        onSubmit={this.onSubmit}
      />
    );
  }
}
 
 
export default TestNestedForm;