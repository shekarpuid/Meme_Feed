import React from 'react';
import {Item as NativeItem} from 'native-base';
const Item = (props) => {
  return <NativeItem {...props}>{props.children}</NativeItem>;
};

export default Item;
