import React from 'react';
import ContinueOptions from './ContinueOptions';

const StyledContinueOptions = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#3994ce'},
    content: {paddingLeft: 40, paddingRight: 40},
    image: {height: 180, width: 250},
    body1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 200,
      marginBottom: 20,
    },
    h1: {color: '#ffffff', fontWeight: 'bold', marginBottom: 10},
  };
  delete props.style;
  return <ContinueOptions {...props} style={style} />;
};

export default StyledContinueOptions;
