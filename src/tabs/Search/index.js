import React, {FC} from 'react';
import Search from './Search';

const StyledSearch: FC = (props) => {
  const style = {
    ...props.style,
  };
  delete props.style;
  return <Search {...props} style={style} />;
};

export default StyledSearch;
