import React from 'react';
import BasicUpload from './BasicUpload';

const StyledBasicUpload = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#00639c'},
    content: {paddingLeft: 30, paddingRight: 30},
    image: {height: 100, width: 100},
    userImage: {height: 250, width: 250},
    form: {marginBottom: 60},
    smallTextBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    h1: {color: '#ffffff', fontWeight: 'bold', marginBottom: 10, marginTop: 50},
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
  return <BasicUpload {...props} style={style} />;
};

export default StyledBasicUpload;
