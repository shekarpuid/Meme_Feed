import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Text,
  H1,
  H3,
  Form,
  Spinner,
} from 'native-base';
import {Image, View} from 'react-native';
import {Button, TextInput, Item} from '../../components/index';
import {connect} from 'react-redux';
import Camera from '../../../assets/camera.png';
import {generateUserCode} from '../../actions/user';

class CreateUserId extends Component {
  state = {
    handleName: '',
    loading: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.loading !== nextProps.user.loading)
      this.setState({loading: nextProps.user.loading});
  }

  // componentDidMount(){
  //   console.log("User: " + JSON.stringify(this.props.user))
  // }

  async handleGenerateCode() {
    const {handleName} = this.state;
    if (handleName === '') {
      alert('Please Enter Handle Name')
      return;
    }

    const info = {
      user_type: 'User',
      login_with: 'signup',
      handleName,
      session_id: this.props.user.data.session_id
    };
    await this.props.generateUserCode(info); // create handle fn
    const userInfo = await this.props.user;
    if (userInfo.error !== null) {
      alert('Handle creation failed');
      return;
    }
    if (userInfo.data.handle_name) {
      this.props.navigation.navigate('BasicInformation');
      return;
    }
    console.log('response result', userInfo);
    // await this.setState({showAck: true});
    // setTimeout(() => {
    //  this.props.navigation.navigate('ValidateCode');
    // }, 3000);
  }

  render() {
    const {style} = this.props;

    return (
      <Container style={style.container}>
        <Content style={style.content}>
          <H1 style={style.h1}>Create Handle Name</H1>
          <Form style={style.form}>
            <Item rounded>
              <TextInput
                placeholder="Enter Handle Name"
                onChangeText={(value) => this.setState({handleName: value})}
              />
            </Item>
          </Form>
          <Button full rounded textLight onPress={() => this.handleGenerateCode()}>
            Create Handle
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
  {generateUserCode},
)(CreateUserId);
