import React from 'react';
import BasicLogin from './BasicLogin';

const StyledBasicLogin = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#00639c'},
    content: {paddingLeft: 30, paddingRight: 30},
    image: {height: 100, width: 250},
    body1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 200,
    },
    h1: {color: '#ffffff', fontWeight: 'bold', marginBottom: 10},
    forgot: {
      color: '#ffffff',
      alignSelf: 'flex-end',
      marginTop: 15,
      marginBottom: 20,
    },

    loginWith: {flexDirection: 'row', justifyContent: 'center'},
    hor: {
      backgroundColor: '#ffff',
      height: 2,
      flex: 0.2,
      alignSelf: 'center',
    },
    horText: {
      color: '#ffff',
      alignSelf: 'center',
      paddingHorizontal: 5,
    },

    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 20,
      paddingBottom: 20,
    },
  };
  delete props.style;
  return <BasicLogin {...props} style={style} />;
};

export default StyledBasicLogin;
