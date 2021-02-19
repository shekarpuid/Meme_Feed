import React from 'react';
import ValidateCode from './ValidateCode';

const StyledValidateCode = (props) => {
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
	image: {height: 180, width: 250},
    body1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 200,
    }
  };
  delete props.style;
  return <ValidateCode {...props} style={style} />;
};

export default StyledValidateCode;
