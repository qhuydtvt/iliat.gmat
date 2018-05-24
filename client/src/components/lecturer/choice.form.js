import React from 'react';
import './choice.form.css';
import { Input } from 'reactstrap';
import { CHOICE_LETTERS } from '../../constants';

export default function(formProps) {
  const {
    values,
    handleChange,
    handleBlur
  } = formProps;

  return (
    <div>
      {
        CHOICE_LETTERS.map((choiceLetter, index) => {
          return (
            <div className="choice-input-wrapper mt-2" key={choiceLetter}>
              <span>{ choiceLetter }.</span>
              <Input
                type={"text"}
                name={`[${index}]`}
                value={values[index]}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
          );
        })
      }
    </div>
  )
}

export function validate(values) {
  return {};
}