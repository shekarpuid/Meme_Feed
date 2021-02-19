import React from 'react';
import CreateUserId from './CreateUserId';

const StyledCreateUserId = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#00639c'},
    content: {paddingLeft: 30, paddingRight: 30},
    image: {height: 100, width: 100},
    form: {marginBottom: 100},
    smallTextBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    h1: {color: '#ffffff', fontWeight: 'bold', marginBottom: 25, marginTop: 50},
    flex1: {
      flex: 1,
    },
    imageBox: {
      backgroundColor: '#FFFFFF',
      width: 250,
      height: 250,
      alignSelf: 'center',
      borderRadius: 7,
      marginTop: 40,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  delete props.style;
  return <CreateUserId {...props} style={style} />;
};

export default StyledCreateUserId;
