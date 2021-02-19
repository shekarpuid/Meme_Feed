import React from 'react';
import Dashboard from './Dashboard';

const StyledDashboard = (props) => {
  const style = {
    ...props.style,
    common: {backgroundColor: '#cccccc'},
    image: {height: 220, width: 220},
    activeIcon: {
      color: '#00639c',fontSize: 23
    },
    icon: {
      color: 'black',fontSize: 23
    },
  };
  delete props.style;
  return <Dashboard {...props} style={style} />
};

export default StyledDashboard
