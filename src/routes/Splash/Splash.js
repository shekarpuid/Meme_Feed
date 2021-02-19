import React, { Component, useEffect, useState } from 'react'
import { Container, Content } from 'native-base'
import { Image, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../../../assets/logo.png'
import { setUserData } from '../../actions/userDataActions'
import { connect } from 'react-redux'

const Splash = (props) => {
  const { style, dispatch, user } = props
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setData()
  }, [])

  const setData = async () => {
    const res = await AsyncStorage.getItem('userData')
    const jsonValue = JSON.parse(res)
    if (jsonValue != null)
      await dispatch(setUserData(jsonValue))
  }

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('userData')
    jsonValue != null ? setTimeout(() => { props.navigation.navigate('Main') }, 1500) : setTimeout(() => { props.navigation.navigate('BasicLogin') }, 1500)

    // console.log(JSON.stringify(res))
    // console.log(JSON.stringify(res.session_id))
    // res != null && res.user_type === 'Creator' && res.signup === 0 ? setTimeout(() => { props.navigation.navigate('AddPhone')}, 1500) :
    // jsonValue != null ? setTimeout(() => { props.navigation.navigate('Main') }, 1500) : setTimeout(() => { props.navigation.navigate('BasicLogin') }, 1500)
  }

  return (
    <Container style={style.container}>
      <Content contentContainerStyle={style.content}>
        <Image source={Logo} resizeMode="contain" style={style.image} />
      </Content>
    </Container>
  )
}
const mapStateToProps = (state) => ({
  user: state.user
})
export default connect(mapStateToProps)(Splash) 
