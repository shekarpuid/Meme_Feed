import React, { useState, useEffect, useRef } from 'react'
import { Header, Right, Left, Body, Button, Title, View } from 'native-base'
import { Modal, ScrollView } from 'react-native'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../styles/common'
import CommentForm from './Comments/CommentForm'
import CommentsList from './Comments/CommentsList'

import { MenuProvider } from 'react-native-popup-menu'

const ParentComment = ({ isVisible, setIsVisible, post, user }) => {
    const StatusBarStyle = Platform.OS === 'ios' ? 'light-content' : 'light-content'
    const [submit, setSubmit] = useState(false)
    const messagesEndRef = React.createRef()
    const scrollViewRef = useRef();

    useEffect(() => {
        // alert(JSON.stringify(user))
        return () => {
            // alert("Unmount")
        }
    }, [])

    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true })
    }

    return (
        <Modal
            animationType="slide"
            // transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setIsVisible(false)
            }}>
            <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                <Left style={{ flex: 0.5 }}>
                    <Button
                        transparent
                        onPress={() => setIsVisible(false)}>
                        <Ionicon name="arrow-back-outline" color="#fff" style={styles.fs25} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontWeight: 'bold', alignSelf: 'center', marginLeft: -40 }}>Comment</Title>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button
                        transparent
                        onPress={() => setIsVisible(false)}>
                        <Ionicon name="close" color="#fff" style={styles.fs25} />
                    </Button>
                </Right>
            </Header>
            
            <MenuProvider>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    <View style={{ flex: 1 }}>
                        <CommentsList post={post} user={user} submit={submit} setSubmit={setSubmit} />
                    </View>
                </ScrollView>
            </MenuProvider>

            {/* <MenuProvider>
                <CommentsList post={post} user={user} submit={submit} setSubmit={setSubmit} />
            </MenuProvider> */}
            <CommentForm post={post} user={user} setSubmit={setSubmit} scrollToBottom={scrollToBottom} />
        </Modal>
    )
}

export default ParentComment