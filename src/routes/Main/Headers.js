import React, { useEffect } from 'react'
import { Text, Button, Header, Left, Body, Right, Title, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import styles from '../../styles/common'
// import Logo from '../../../assets/home-logo.png'
import Logo from '../../../assets/logo.png'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'

const Headers = (props) => {
    const { selectedTabIndex, setShowPosts, showPosts, user } = props
    // useEffect(() => {
        // alert(JSON.stringify(user))
    // }, [showPosts])

    function renderHeader() {
        const StatusBarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'
        

        // Create Post Header
        if (showPosts) {
            return (
                <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                    <Left style={{ flex: 0.5 }}>
                        <Button
                            transparent
                            onPress={() => setShowPosts(false)}>
                            <Ionicon name="arrow-back-outline" color="#fff" style={styles.fs25} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontWeight: 'bold', alignSelf: 'center' }}>
                            Create Post
                </Title>
                    </Body>
                    <Right style={{ flex: 0.3 }}>
                        <Button
                            transparent
                            onPress={() => setShowPosts(false)}>
                            <Ionicon name="close" color="#fff" style={styles.fs25} />
                        </Button>
                    </Right>
                </Header>
            )
        }

        // Search Header
        if (selectedTabIndex === 2) {
            return (
                <Header searchBar style={{ backgroundColor: '#fff' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                    <Item>
                        <Ionicon name="ios-search" size={23} />
                        <Input placeholder="Search with #Hash Tag" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
            )
        }

        if (selectedTabIndex === 4) return null

        // Dashboard Header
        return (
            <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                {selectedTabIndex !== 3 ? <Left style={{ flex: 0.1 }}>
                    <Image source={Logo} style={styles.logo} />
                </Left> : null}
                <Body>
                    {/* <Title
                style={{fontStyle: 'italic', fontWeight: 'bold', marginLeft: 5}}>
                {displayContent.value}
              </Title> */}
                </Body>
                <Right style={{ flex: 0.3 }}>
                    {user.data !== null && user.data !== undefined &&
                        user.data.user_type !== 'User' ? (
                            <Button transparent onPress={() => setShowPosts(true)}>
                                <Ionicon name="add-circle-outline" color="#fff" style={styles.fs25} />
                            </Button>
                        ) : null}
                </Right>
            </Header>
        )
    }
    return (
        <>
            {renderHeader()}
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    posts: state.posts.posts,
    createPost: state.createPost,
    postTypes: state.postTypes,
})
export default connect(mapStateToProps)(Headers)