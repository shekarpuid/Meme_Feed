
import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Text, Form, Spinner, H1, H3 } from 'native-base'
import { TouchableOpacity, View } from 'react-native'
import { Button, TextInput, Item } from '../components/index'
import { encode } from 'base-64'
import { env } from '../env'
import { forgotPasswordUserInfo } from '../actions/ForgotPasswordActions'

const ForgotPassword = (props) => {
    const { fuser, handleFUserInfo } = props
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // component unmount
        return () => {
            handleFUserInfo({})
        }
    }, [])

    const handleContinue = async () => {
        setLoading(true)
        if (value.length > 0) {
            // alert(`Value: ${value}`)
            try {
                const username = 'memefeed'
                const password = 'Connect12345!'
                const myHeaders = new Headers()
                myHeaders.append('Content-Type', 'multipart/form-data')
                myHeaders.append(
                    'Authorization',
                    `Basic ${encode(`${username}:${password}`)}`
                )

                let formData = new FormData()
                formData.append('email_mobile', value)

                const url = `${env.baseUrl}users/fpassword`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: myHeaders,
                    body: formData
                })
                const res = await response.json()
                // setUserInfo(res)
                console.log(res)
                if (res.status === 0) {
                    alert(JSON.stringify(res.msg))
                } else {
                    handleFUserInfo(res)
                }
                setValue('')
                setLoading(false)
            } catch (error) {
                // alert(error)
                console.error(error)
                setValue('')
                setLoading(false)
            }
        } else {
            alert("Please enter email or phone number")
        }
    }

    return (
        <>
            <Container style={{ backgroundColor: '#00639c' }}>
                <Content style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
                    {fuser.status === 1 ? (
                        <View>
                            <H3 style={{ marginBottom: 10, color: '#fff', fontWeight: 'bold' }}>User info</H3>
                            <Text style={{ marginBottom: 2, color: '#ddd' }}>Handle name: {fuser.user_info.handle_name}</Text>
                            <Text style={{ marginBottom: 30, color: '#ddd' }}>Password: {fuser.user_info.password}</Text>
                            <Button full rounded textLight onPress={() => props.navigation.navigate('BasicLogin')}>Signin</Button>
                        </View>) : <View>
                            <H1 style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>Forgot Password</H1>
                            <Form style={{ marginBottom: 60, marginTop: 5 }}>
                                <Item regular>
                                    <TextInput light placeholder="Email or Phone number*" value={value}
                                        onChangeText={(value) => setValue(value)}
                                    // onChangeText={(value) => this.setState({city: value})}
                                    />
                                </Item>
                            </Form>
                            <Button full rounded textLight onPress={() => handleContinue()}>CONTINUE</Button></View>}
                    {loading ? (
                        <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} />
                    ) : null}
                </Content>
            </Container>
        </>
    )
}
function mapStateToProps(state) {
    return {
        fuser: state.fuser.fuser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleFUserInfo: forgotPasswordUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)