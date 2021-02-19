import React, {FC} from 'react';
import Home from './Home';

const StyledHome = (props) => {
  const style = {
    ...props.style,
  };
  delete props.style;
  return <Home {...props} style={style} />;
};

export default StyledHome;
