import React, { Component } from 'react';
import  { withFormik, Formik } from 'formik';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';

export default function(formProps) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    validateForm
  } = formProps;

  const { title, content } = values;
  
  return (
    <div>
      <FormGroup>
        <Label>Title</Label>
        <Input
          name="title"
          invalid={touched.title && !!errors.title}
          value={title}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Content</Label>
        <Input
          name="content"
          invalid={touched.content && !!errors.content}
          value={content}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>
    </div>
  );
}

export function validate(values) {
  const errors = {};
  if(!values.title) {
    errors.title = "Tiêu đề không được để trống";
  }
  if(!values.content) {
    errors.content = "Nội dung không được để trống";
  }
  return errors;
}