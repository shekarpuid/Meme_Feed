import React, { Component } from 'react';
import { Container, Content, H1, Form, Spinner, Icon, DatePicker, Picker } from 'native-base'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Button, TextInput, Item } from '../../components/index'
import { addBasicInfo } from '../../actions/user'
import { loadCountries, loadStates, loadCities } from '../../actions/address'

class BasicInformation extends Component {
  state = {
    name: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    city: 'Select City',
    state: '',
    country: '',
    zipcode: '',
    loading: false,
    date: ''
  };

  async componentDidMount() {
    this.setState({
      name: this.props.user.data.handle_name || '',
      date: new Date()
    });
    await this.props.loadCountries();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.loading !== nextProps.address.loading)
      this.setState({ loading: nextProps.address.loading });
    if (this.state.loading !== nextProps.user.loading)
      this.setState({ loading: nextProps.user.loading });
  }

  setDate(newDate) {
    const date = new Date(newDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 //getMonth is zero based;
    const day = date.getDate();
    const formatted = year + "-" + month + "-" + day;
    console.log('ddksjf', formatted);
    this.setState({ dateOfBirth: formatted });
  }

  async onValueChange2(value) {
    await this.setState({
      country: value,
    });
    const countries = await this.props.address.data.countries;
    let key = null;
    countries.forEach((element) => {
      if (element.name === value) {
        key = element.id;
      }
    });
    await this.props.loadStates(key, this.props.address.data);
  }
  async onValueChange4(value) {
    await this.setState({
      gender: value,
    });
  }
  async onValueChange3(value) {
    const states = await this.props.address.data.states;
    let id = null
    await this.setState({
      state: value,
    });
    states.forEach((state) => {
      if (state.name === value) {
        id = state.id;
      }
    })
    await this.props.loadCities(id);
  }
  async onValueCityChange(value) {
    await this.setState({
      city: value,
    });
  }

  async handleBasicInfo() {
    const {
      name,
      password,
      dateOfBirth,
      gender,
      city,
      state,
      country,
      zipcode,
    } = await this.state;
    console.log(JSON.stringify(this.state));

    if (password === '') {
      alert('Please Enter Password');
      return;
    }
    if (dateOfBirth === '') {
      alert('Please Enter Date Of Birth');
      return;
    }
    if (gender === '') {
      alert('Please Select Gender');
      return;
    }
    if (country === '') {
      alert('Please Select Country');
      return;
    }
    if (state === '') {
      alert('Please Select State');
      return;
    }
    if (city === '') {
      alert('Please Enter City');
      return;
    }
    if (zipcode === '') {
      alert('Please Enter Zipcode');
      return;
    }
    if (state === 'state') {
      alert('Please Select State');
      return;
    }

    if (password.length < 6) {
      alert('Password should be atleast 6 charecters ');
      return;
    }
    const userInfo = await this.props.user.data;
    const info = {
      user_id: userInfo.session_id,
      password,
      date_of_birth: dateOfBirth,
      gender,
      country,
      state,
      city,
      zipcode,
    };

    await this.props.addBasicInfo(info, userInfo);
    const userInfo2 = await this.props.user;
    if (userInfo2.error !== null) {
      alert('Internal Server Error');
      return;
    }
    if (userInfo2.data.msg === 'Inserted Success') {
      this.props.navigation.navigate('BasicUpload');
      return;
    }
    alert('Failed');
  }

  renderCountryOptions() {
    const countries = this.props.address?.data?.countries || [];
    if (countries.length) {
      return countries.map((country) => {
        return (
          <Picker.Item
            label={country.name}
            value={country.name}
            key={country.id}
          />
        );
      });
    }
    return null;
  }

  renderStateOptions() {
    const states = this.props.address?.data?.states || [];
    if (this.props.address.data && states.length) {
      return states.map((state) => {
        return (
          <Picker.Item label={state.name} value={state.name} key={state.id} />
        );
      });
    }
    // return <Picker.Item label="Select State" value="" />;
  }

  renderCityOptions() {
    const cities = this.props.address.cities
    if (cities.length > 0) {
      return cities.map((city) => {
        return (
          <Picker.Item label={city.name} value={city.name} key={city.id} />
        );
      });
    }
    // return <Picker.Item label="Select State" value="" />;
  }

  render() {
    const { style } = this.props;

    return (
      <Container style={style.container}>
        <Content style={style.content}>
          <H1 style={style.h1}>Basic Information</H1>
          <Form style={style.form}>
            <Item regular>
              <TextInput
                editable={false}
                light
                placeholder="Name"
                value={this.state.name}
                onChangeText={(value) => this.setState({ name: value })}
              />
            </Item>
            <Item regular>
              <TextInput
                light
                placeholder="Password"
                value={this.state.password}
                onChangeText={(value) => this.setState({ password: value })}
              />
            </Item>
            <Item regular style={{ height: 50, backgroundColor: '#000' }}>
              <DatePicker
                // defaultDate={new Date(2018, 4, 4)}
                // minimumDate={new Date(2018, 1, 1)}
                // maximumDate={new Date(2018, 12, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Select DOB"
                textStyle={{ color: '808080' }}
                placeHolderTextStyle={{ color: '#808080' }}
                onDateChange={this.setDate.bind(this)}
                disabled={false}
                style={{ width: '100%', backgroundColor: '#000' }}
              />
            </Item>
            <Item
              regular
              picker
              style={{
                backgroundColor: '#00639c',
                borderRadius: 5,
              }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                // style={{width: '70%', color: '#fff', fontWeight: 'bold'}}
                placeholder="Gender"
                // placeholderStyle={{color: '#fff'}}
                placeHolderTextStyle={{ color: '#808080' }}
                placeholderIconColor="red"
                selectedValue={this.state.gender}
                onValueChange={this.onValueChange4.bind(this)}>
                <Picker.Item label="Select Gender" value="" style={{ color: '#808080' }} />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </Item>
            <View style={style.smallTextBox}>
              <View style={style.flex1}>
                <Item regular picker style={{ backgroundColor: '#00639c', borderRadius: 5 }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    // style={{width: '70%', color: '#fff', fontWeight: 'bold'}}
                    placeholder="Select Country"
                    // placeholderStyle={{color: '#fff'}}
                    placeholderIconColor="red"
                    selectedValue={this.state.country}
                    onValueChange={this.onValueChange2.bind(this)}>
                    <Picker.Item label="Select Country" value="" style={{ color: '#808080' }} />
                    {this.renderCountryOptions()}
                  </Picker>
                </Item>
              </View>
              <View style={style.flex1}>
                <Item regular picker style={{ backgroundColor: '#00639c', borderRadius: 5 }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    // style={{width: '70%', color: '#fff', fontWeight: 'bold'}}
                    placeholder="Select State"
                    // placeholderStyle={{color: '#fff'}}
                    placeholderIconColor="red"
                    selectedValue={this.state.state}
                    onValueChange={this.onValueChange3.bind(this)}>
                    <Picker.Item label="Select State" value="Select State" style={{ color: '#808080' }} />
                    {this.renderStateOptions()}
                  </Picker>
                </Item>
              </View>
            </View>
            <View style={style.smallTextBox}>
              <View style={style.flex1}>
                <Item regular picker style={{ backgroundColor: '#00639c', borderRadius: 5 }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    // style={{width: '70%', color: '#fff', fontWeight: 'bold'}}
                    placeholder="Select City"
                    // placeholderStyle={{color: '#fff'}}
                    placeholderIconColor="red"
                    selectedValue={this.state.city}
                    onValueChange={this.onValueCityChange.bind(this)}>
                    <Picker.Item label="Select City" value="Select City" style={{ color: '#808080' }} />
                    {this.renderCityOptions()}
                  </Picker>
                </Item>
              </View>

              {/* <View style={style.flex1}>
                <Item regular>
                  <TextInput
                    light
                    placeholder="City"
                    onChangeText={(value) => this.setState({ city: value })}
                  />
                </Item>
              </View> */}

              <View style={style.flex1}>
                <Item regular>
                  <TextInput
                    light
                    placeholder="Zipcode"
                    onChangeText={(value) => this.setState({ zipcode: value })}
                  />
                </Item>
              </View>
            </View>
          </Form>
          <Button full rounded textLight onPress={() => this.handleBasicInfo()}>CONTINUE</Button>
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
    address: state.address,
  }),
  {
    addBasicInfo,
    loadCountries,
    loadStates,
    loadCities
  },
)(BasicInformation);
