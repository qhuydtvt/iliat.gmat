import React from 'react';
import { Input } from 'reactstrap';

import './choice.css';

export default function(props) {
  return (
    <div className="choice-input-wrapper mt-2" key={props.choiceLetter}>
      <span>{ props.choiceLetter }.</span>
      <Input
        type={props.type ? props.type: "text"}
        name={props.name}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
}