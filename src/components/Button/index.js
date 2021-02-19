import React from 'react';
import Button from './Button';

const StyledButton = (props) => {
  function textColor() {
    if (props.prim) return '#ffffff';
    if (props.textLight) return '#3994ce';
    return '#000000';
  }
  const style = {
    ...props.style,
    marginBottom: 20,
    backgroundColor: props.prim ? '#3994ce' : '#ffffff',
    textStyle: {
      color: textColor(),
      fontWeight: 'bold',
    },
    iconStyle: {
      color: '#8B0000',
    },
  };

  delete props.style;
  if (props.iconButton) {
    style.borderRadius = 9;
  }
  if (props.large) {
    style.height = 60;
  }
  return <Button {...props} style={style} />;
};

export default StyledButton;
