import React, {FC} from 'react';
import Profile from './Profile';

const StyledProfile: FC = (props) => {
  const style = {
    ...props.style
  };
  delete props.style;
  return <Profile {...props} style={style} />;
};

export default StyledProfile;
