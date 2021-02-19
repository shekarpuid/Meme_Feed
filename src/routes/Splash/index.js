import React, {FC} from 'react';
import Splash from './Splash';

const StyledSplash: FC = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#00639c'},
    image: {height: 180, width: 180},
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  delete props.style;
  return <Splash {...props} style={style} />;
};

export default StyledSplash;
