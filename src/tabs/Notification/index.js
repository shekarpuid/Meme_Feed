import React, {FC} from 'react';
import Notification from './Notification';

const StyledNotification: FC = (props) => {
  const style = {
    ...props.style,
  };
  delete props.style;
  return <Notification {...props} style={style} />;
};

export default StyledNotification;
