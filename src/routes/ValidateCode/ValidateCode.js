import React, {Component} from 'react';
import {Container, Content, Form, Spinner} from 'native-base';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, TextInput, Item} from '../../components/index';
import Logo from '../../../assets/logo.png';
import {validateUserCode} from '../../actions/user';

class ValidateCode extends Component {
  state = {
    handleName: '',
    passcode: '',
    loading: false,
  };
  componentDidMount() {
    this.setState({handleName: this.props.user.data.handle_name});
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.loading !== nextProps.user.loading)
      this.setState({loading: nextProps.user.loading});
  }

  async handleContinue() {
    const {handleName, passcode} = await this.state;
    if (handleName === '' || passcode === '') {
      alert('Please Fill Form Fields');
      return;
    }
    const info = {
      handleName,
      passcode,
    };
    const userInfo = this.props.user.data || {};
    await this.props.validateUserCode(info, this.props.user.data);
    const userInfo2 = await this.props.user;
    if (userInfo2.error !== null) {
      alert('User Login Failed');
      return;
    }
    // const sessionId = (await this.props.user.data.session_id) || '';
    // if (sessionId === '') {
    //   alert('Please Enter valid passcode');
    //   return;
    // }

    this.props.navigation.navigate('AddPhone');
  }

  render() {
    const {style} = this.props;

    return (
      <Container style={style.container}>
        <Content style={style.content}>
          <View style={style.body1}>
            <Image source={Logo} resizeMode="contain" style={style.image} />
          </View>
          <Form style={style.form}>
            <Item regular>
              <TextInput
                light
                placeholder="Enter handle name*"
                value={this.state.handleName}
                onChangeText={(value) => this.setState({handleName: value})}
              />
            </Item>
            <Item regular>
              <TextInput
                light
                placeholder="Enter pass code*"
                value={this.state.passcode}
                onChangeText={(value) => this.setState({passcode: value})}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            textLight
            large
            onPress={() => this.handleContinue()}>
            CONTINUE
          </Button>
          {this.state.loading ? (
            <Spinner color="#00639c" style={{marginTop: 10, alignSelf: 'center'}} />
          ) : null}
        </Content>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  {
    validateUserCode,
  },
)(ValidateCode);
