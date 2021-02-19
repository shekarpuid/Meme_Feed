import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Text,
  H1,
  H3,
  Form,
  Button,
  Icon,
  Item,
} from 'native-base';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import Logo from '../../../assets/logo.png';
import {IconButton} from '../../components/index';

class ContinueOptions extends Component {
  render() {
    const {style} = this.props;

    return (
      <Container style={style.container}>
        <Content style={style.content}>
          <View style={style.body1}>
            <Image source={Logo} resizeMode="contain" style={style.image} />
          </View>
          <Form>
            <IconButton
              name="Gmail"
              onPress={() => alert('under implementation')}
            />
            <IconButton
              name="Facebook"
              onPress={() => alert('under implementation')}
            />
            <IconButton
              name="Twitter"
              onPress={() => alert('under implementation')}
            />
            <IconButton
              name="Email"
              onPress={() => alert('under implementation')}
            />
            <IconButton
              name="Phone"
              onPress={() => this.props.navigation.navigate('BasicInformation')}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect((state) => ({}), {})(ContinueOptions);
