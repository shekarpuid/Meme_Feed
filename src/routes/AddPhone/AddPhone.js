/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, Form, Spinner, H1 } from 'native-base';
import { View } from 'react-native';
import { Button, TextInput, Item } from '../../components/index';
import { changeCount } from '../../actions/counts';
import { genrateOrValidateOtp } from '../../actions/user';

class AddPhone extends Component {
  state = {
    phone: '',
    otp: '',
    showOtp: false,
    loading: false,
    email: ''
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.loading !== nextProps.user.loading)
      this.setState({ loading: nextProps.user.loading });
  }

  async handleOtpCheck() {
    const { otp } = this.state

    if (otp === '') {
      alert('Please Enter Otp');
      return;
    }
    const info = {
      otp,
      session_id: this.props.user.data.session_id,
    };
    const userInfo = this.props.user.data || {};

    await this.props.genrateOrValidateOtp(info, userInfo);
    console.log(info)
    const userInfo2 = await this.props.user;
    if (userInfo2.error !== null) {
      alert('User Otp Validation Failed');
      return;
    }
    if (userInfo2.data.otp === 'InValidOtp') {
      alert('Invalid OTP');
      return;
    }
    if (
      userInfo.user_type === 'Creator' &&
      Number(userInfo.signup) === 0
    ) {
      this.setState({ handleName: '', passcode: '' })
      this.props.navigation.navigate('BasicInformation')
      return
    }
    this.props.navigation.navigate('CreateUserId');
  }

  async handleContinue() {
    const { phone, showOtp, email } = this.state;
    if (this.props.user.signupType === 'phone') {
      if (phone === '') {
        alert('Please Enter Phone Number');
        return;
      }
      if (phone.length !== 10) {
        alert('Please Enter Valid Phone Number');
        return;
      }
    }
    if (showOtp) return this.handleOtpCheck();

    let signUpType = ''
    let phoneoremail = ''
    if (this.props.user.signupType === 'phone') {
      signUpType = 'phone'
      phoneoremail = phone
    } else {
      signUpType = 'email'
      phoneoremail = email
    }

    const info = {
      user_type: 'User',
      login_with: 'signup',
      phone: phoneoremail,
      type: signUpType
    };

    console.log(JSON.stringify(info))
    const userInfo = this.props.user.data || {}

    await this.props.genrateOrValidateOtp(info, userInfo);
    const userInfo2 = await this.props.user;
    if (userInfo2.error !== null) {
      // alert('User Otp Generation Failed');
      return;
    }
    if (userInfo2.data.otp) {
      await this.setState({ showOtp: true });
      return;
    }
  }

  renderOtp() {
    if (this.state.showOtp) {
      return (
        <Item regular>
          <TextInput
            light
            placeholder="Enter Otp*"
            onChangeText={(value) => this.setState({ otp: value })}
          />
        </Item>
      );
    }
    return null;
  }

  render() {
    const { style } = this.props;
    return (
      <Container style={style.container}>
        <Content style={style.content}>
          <H1 style={style.h1}>Add {this.props.user.signupType === 'email' ? 'Email' : 'Phone Number'}</H1>
          <Form style={style.form}>
            <Item regular>
              {this.props.user.signupType === 'email' ?
                <TextInput
                  light
                  placeholder="Email*"
                  onChangeText={(value) =>
                    this.setState({ email: value, showOtp: false })
                  }
                />
                :
                <TextInput
                  light
                  placeholder="Phone number*"
                  onChangeText={(value) =>
                    this.setState({ phone: value, showOtp: false })
                  }
                />
              }
            </Item>
            {this.renderOtp()}
          </Form>
          <Button full rounded textLight onPress={() => this.handleContinue()}>
            CONTINUE
          </Button>
          {this.state.loading ? (
            <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} />
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
  { genrateOrValidateOtp, changeCount },
)(AddPhone);
