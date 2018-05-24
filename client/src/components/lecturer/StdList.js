import React from 'react';
import _ from 'lodash';
import { CheckBox, Table } from 'reactstrap';
 
export default function(props) {
  const students = props.students;
  return (<Table>
    <thead>
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Class</td>
        <td>Email</td>
      </tr>
    </thead>
    <tbody>
      {
        _.map(students, (student, id) => {
          return (
            <tr key={id}>
              <td></td>
              <td>{student.name}</td>
              <td>{student.className}</td>
              <td>{student.email}</td>
            </tr>
          )
        })
      }
    </tbody>
  </Table>);
}