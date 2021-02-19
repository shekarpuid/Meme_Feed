/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Text, Form, Spinner, Toast} from 'native-base';
import {View} from 'react-native';
import {Button, TextInput, Item} from '../../components/index';
import {generateUserCode, clearUser} from '../../actions/user';

class RequestCode extends Component {
  state = {
    name: '',
    handleName: '',
    showAck: false,
    loading: false,
  };

  componentDidMount() {
    this.props.clearUser();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.loading !== nextProps.user.loading)
      this.setState({loading: nextProps.user.loading});
  }

  async handleGenerateCode() {
    const {name, handleName} = this.state;
    if (name === '' || handleName === '') {
      alert('Please Fill Details');
      return;
    }

    const info = {
      name,
      handleName,
    };
    await this.props.generateUserCode(info);
    const userInfo = await this.props.user;
    if (userInfo.error !== null) {
      alert('Handle creation failed');
      return;
    }
    await this.setState({showAck: true});
    setTimeout(() => {
      this.props.navigation.navigate('ValidateCode');
    }, 3000);
  }

  renderACK() {
    if (this.state.showAck)
      return (
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingTop: 15,
            paddingBottom: 15,
            paddingRight: 10,
            paddingLeft: 50,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>
            Hi {this.state.name} , we are happy to{' '}
          </Text>
          <Text style={{fontWeight: 'bold', marginBottom: 8, fontSize: 17}}>
            welcome you to MemeFeed
          </Text>
          <Text style={{fontSize: 18}}>Click this link :</Text>
          <Text style={{color: '#3994ce'}}>http://www.memefeed.com/ </Text>
          <Text>and signup as a creator by entering</Text>
          <Text style={{marginBottom: 8}}>below details in the form</Text>
          <Text>
            Your handle name :{' '}
            <Text style={{color: '#3994ce', fontWeight: 'bold'}}>
              {this.state.handleName}
            </Text>
          </Text>
          <Text style={{marginBottom: 8}}>
            Your passcode :{' '}
            <Text style={{color: '#3994ce', fontWeight: 'bold'}}>
              {this.props.user.data.passcode || ''}
            </Text>
          </Text>
          <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 14}}>
            Note: Never share these details with anyone
          </Text>
        </View>
      );
    return null;
  }
  render() {
    const {style} = this.props;
    return (
      <Container style={style.container}>
        <Content style={style.content}>
          <Form style={style.form}>
            <Item regular>
              <TextInput
                light
                placeholder="Enter name*"
                onChangeText={(value) => this.setState({name: value})}
              />
            </Item>
            <Item regular>
              <TextInput
                light
                placeholder="Enter handle name*"
                onChangeText={(value) => this.setState({handleName: value})}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            textLight
            large
            onPress={() => this.handleGenerateCode()}>
            GENERATE CODE
          </Button>
          {this.state.loading ? (
            <Spinner color="#00639c" style={{marginTop: 10, alignSelf: 'center'}} />
          ) : null}
          {this.renderACK()}
          {/* <Text>{JSON.stringify(this.props.user) || ''} </Text> */}
        </Content>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  {generateUserCode, clearUser},
)(RequestCode);
