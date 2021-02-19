import React, {FC} from 'react';
import Sliders from './Sliders';

const StyledSliders: FC = (props) => {
  const style = {
    ...props.style,
    container: {backgroundColor: '#00639c'},
    image: {height: 250, width: 250},
    content: {
      display: 'flex',
      flex: 1,
    },
    contentContainer: {
      borderWidth: 2,
      borderColor: '#CCC',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    sliderBox: {
      height: 250,
      backgroundColor: '#ffffff',
    },
    imageBox: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    buttonStyle: {alignSelf: 'center'},
    sliderBody: {textAlign: 'center', marginBottom: 10},
    sliderHeader: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
    },
    dot: {
      backgroundColor: '#A9A9A9',
      width: 16,
      height: 16,
      borderRadius: 9,
      marginTop: 10,
      marginLeft: 7,
      marginRight: 7,
    },
    activeDot: {
      backgroundColor: '#3994ce',
      width: 16,
      height: 16,
      borderRadius: 9,
      marginTop: 10,
      marginLeft: 7,
      marginRight: 7,
    },
    page: {
      bottom: 70,
    },
  };

  delete props.style;
  return <Sliders {...props} style={style} />;
};

export default StyledSliders;
