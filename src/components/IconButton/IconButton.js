import React from 'react';
import {Button as NativeButton, Text, Icon} from 'native-base';
import {View} from 'react-native';
const IconButton = (props) => {
  const name = `Continue with ${props.name}`;
  return (
    <NativeButton {...props} full rounded iconLeft light transparent>
      <View style={props.style.box}>
        <Icon name="arrow-back" style={props.style.icon} />
        <Text style={props.style.text}>{name}</Text>
      </View>
    </NativeButton>
  );
};

export default IconButton;
