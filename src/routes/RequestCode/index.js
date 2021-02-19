import React from 'react';
import RequestCode from './RequestCode';

const StyledRequestCode = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#00639c'},
    content: {paddingLeft: 30, paddingRight: 30, paddingTop: 30},
    form: {marginBottom: 60, marginTop: 30},
    smallTextBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    h1: {color: '#ffffff', fontWeight: 'bold', marginBottom: 10, marginTop: 50},
    flex1: {
      flex: 1,
    },
  };
  delete props.style;
  return <RequestCode {...props} style={style} />;
};

export default StyledRequestCode;
