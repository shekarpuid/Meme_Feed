import React, {Component} from 'react' 
import {Container, Content, H1, Text} from 'native-base' 
import {Image, View} from 'react-native' 
import {Button} from '../../components/index' 
import Swiper from 'react-native-swiper' 
import Time from '../../../assets/timet.png' 

let tempSliderHeader = 'Lorem ipsum' 
let tempSliderBody =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euis- mod tincidunt ut laoreet dolore magna ali- quamerat volutpat. Ut wisi enim ad minimum test seriers of expersion.' 

class Sliders extends Component {
  state = {
    selectedIndex: 0,
    showsliders: true,
  } 

  handleSwipe(e) {
    e.preventDefault() 
    if (this.state.selectedIndex === 2) this.setState({showsliders: false}) 
  }

  renderSlider(style) {
    return (
      <Swiper
        index={this.state.selectedIndex}
        onIndexChanged={(index) => {
          this.setState({selectedIndex: index}) 
        }}
        onMomentumScrollEnd={(e) => this.handleSwipe(e)}
        dot={<View style={style.dot} />}
        activeDot={<View style={style.activeDot} />}
        paginationStyle={style.page}
        loop={false}>
        <View style={style.slide}>
          <H1 style={style.sliderHeader}>{tempSliderHeader}</H1>
          <Text style={style.sliderBody}>{tempSliderBody}</Text>
        </View>
        <View style={style.slide}>
          <H1 style={style.sliderHeader}>{tempSliderHeader}</H1>
          <Text style={style.sliderBody}>{tempSliderBody}</Text>
        </View>
        <View style={style.slide}>
          <H1 style={style.sliderHeader}>{tempSliderHeader}</H1>
          <Text style={style.sliderBody}>{tempSliderBody}</Text>
        </View>
      </Swiper>
    ) 
  }

  renderContinue(style) {
    return (
      <View style={style.slide}>
        <H1 style={style.sliderHeader}>{tempSliderHeader}</H1>
        <Text style={style.sliderBody}>{tempSliderBody}</Text>
        <Button
          style={style.buttonStyle}
          rounded
          prim
          onPress={() => this.props.navigation.navigate('BasicLogin')}>
          CONTINUE
        </Button>
      </View>
    ) 
  }
  render() {
    const {style} = this.props 
    return (
      <Container style={style.container}>
        <Content contentContainerStyle={style.content}>
          <View style={style.imageBox}>
            <Image source={Time} resizeMode="contain" style={style.image} />
          </View>
          <View style={style.sliderBox}>
            {this.state.showsliders
              ? this.renderSlider(style)
              : this.renderContinue(style)}
          </View>
        </Content>
      </Container>
    ) 
  }
}

export default Sliders 
