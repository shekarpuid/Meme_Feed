import React, {FC} from 'react';
import CreatePost from './CreatePost';

const StyledCreatePost: FC = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#3994ce'},
    image: {height: 220, width: 220},
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  delete props.style;
  return <CreatePost {...props} style={style} />;
};

export default StyledCreatePost;
