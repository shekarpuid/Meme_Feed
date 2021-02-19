import React from 'react';
import Item from './Item';

const StyledItem = (props) => {
  const style = {
    ...props.style,
    margin: 10,
  };

  if (props.regular) {
    style.borderRadius = 15;
    style.backgroundColor = '#ffffff';
  }

  delete props.style;
  return <Item {...props} style={style} />;
};

export default StyledItem;
