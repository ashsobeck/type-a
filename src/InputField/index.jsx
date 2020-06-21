import React from 'react';
import '../index.css';

const InputField = (props) => {
  return (
    <div
      className={props.class}
      noValidate
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
    >
      <input
        className={props.textPlace}
        placeholder="happy typing!"
        id="outlined-input"
      />
    </div>
  );
};

export default InputField;
