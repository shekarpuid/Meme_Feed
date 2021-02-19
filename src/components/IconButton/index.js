import React from 'react';
import IconButton from './IconButton';

const StyledIconButton = (props) => {
  const style = {
    ...props.style,
    marginBottom: 25,
    height: 60,
    borderColor: '#ffffff',
    borderWidth: 1,
    box: {
      width: '95%',
      display: 'flex',
      flexDirection: 'row',
    },
    icon: {marginRight: 25, color: '#ffffff'},
    text: {color: '#ffffff', fontSize: 18, fontWeight: 'bold'},
  };

  return <IconButton {...props} style={style} />;
};

export default StyledIconButton;
