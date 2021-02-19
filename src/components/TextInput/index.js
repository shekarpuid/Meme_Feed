import React from 'react';
import TextInput from './TextInput';

const StyledTextInput = (props) => {
  const style = {
    ...props.style,
    color: props.light ? '#808080' : '#ffffff',
  };

  delete props.style;
  return (
    <TextInput
      {...props}
      placeholderTextColor={props.light ? '#808080' : '#ffffff'}
      style={style}
    />
  );
};

export default StyledTextInput;
