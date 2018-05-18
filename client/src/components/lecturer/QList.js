import React from 'react';
import { Table } from 'reactstrap';
import _ from 'lodash';

import { elipsis } from '../../utils';

import './QList.css';

export default function(props) {
    const questions = props.questions;
    const showActions = props.onEditRequest || props.onDeleteRequest;
    const stimulusMaxLength = props.stimulusMaxLength ? props.stimulusMaxLength : 100;
    const onQuestionClicked = props.onQuestionClicked ? props.onQuestionClicked : () => {};
    const pointer = props.pointer? "pointer": "";
    return (
      <Table>
        <thead className="">
          <tr className="">
            <th>#</th>
            <th>Stimulus</th>
            <th>Difficulty</th>
            {showActions && <th className="">Actions</th>}
          </tr>
        </thead>
        <tbody className="container">
          { 
            _.map(questions, (question, id) => {
              const trClassName = question.selected ? `q-selected ${pointer}` : pointer;
              return (<tr key={id} className={trClassName} onClick={() => onQuestionClicked(question)}> 
                { renderId(question.id) }
                { renderStimulus(elipsis(question.stimulus, stimulusMaxLength)) }
                { renderDifficulty(question.difficulty) }
                { showActions  && renderActions(question, props.onEditRequest, props.onDeleteRequest) }
              </tr>);
            })
          }
        </tbody>
      </Table>
    );
}

function renderId(id)  {
  return (
    <th scope="row"> { id }</th>
  );
}

function renderStimulus(stimulus) {
  return (
    <td className="td-stimulus">
      <span dangerouslySetInnerHTML={{__html: stimulus}} />
    </td> 
  );
}

function renderDifficulty(difficulty) {
  switch(difficulty) {
    case 0: return (<td><span className="q-difficulty q-easy">Easy</span></td>);
    case 1: return (<td><span className="q-difficulty q-medium">Medium</span></td>);
    case 2: return (<td><span className="q-difficulty q-hard">Hard</span></td>);
    case 3: return (<td><span className="q-difficulty q-very-hard">Very hard</span></td>);
    default: return (<td><span>Unknown</span></td>);
  }
}

function renderActions(question, editRequest, deleteRequest) {
  return (
    <td>
      {editRequest && <i className="far fa-edit question-edit" onClick={() => editRequest(question)}></i>}
      {deleteRequest && <i className="fas fa-trash question-remove" onClick={() => deleteRequest(question)}></i>}
    </td>
  );
}