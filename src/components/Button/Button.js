import React from 'react';
import {Button as NativeButton, Text, Icon} from 'native-base';
const Button = (props) => {
  return (
    <NativeButton {...props}>
      {props.iconButton ? (
        <Icon name={props.iconName} style={props.style.iconStyle} />
      ) : (
        <Text style={props.style.textStyle}> {props.children} </Text>
      )}
    </NativeButton>
  );
};

export default Button;
