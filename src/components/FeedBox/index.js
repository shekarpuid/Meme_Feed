import React, {FC} from 'react';
import FeedBox from './FeedBox';

const StyledFeedBox: FC = (props) => {
  const style = {
    ...props.style,
  };
  delete props.style;
  return <FeedBox {...props} style={style} />;
};

export default StyledFeedBox;
