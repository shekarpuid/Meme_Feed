import React, { useState, useEffect } from 'react'
import { Container, Content, Text, Footer, FooterTab, Button, Badge, Header, Left, Body, Right, Title, Item, Input, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Notification, Home, Search, Profile } from '../../tabs/index'
import { HLogo } from '../../../assets/camera.png'
// import { getPosts } from '../../actions/postActions'
import { createNewPost } from '../../actions/createPost'
import { loadPostTypes } from '../../actions/postTypes'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import Faicon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../styles/common'
import Logo from '../../../assets/home-logo.png'

let tabsItems = [
  { key: 'Home', value: 'Meme Feed' },
  { key: 'Hash', value: 'Meme Feed' },
  { key: 'Search', value: 'Meme Feed' },
  { key: 'Notification', value: 'Notification' },
  { key: 'Profile', value: 'Meme Feed' },
]

const Dashboard = (props) => {
  const initialState = {
    selectedTabIndex: 0,
    showPost: false,
    posts: [],
    loading: false,
    postTypes: [],
    postLoading: false
  }
  const [state, setState] = useState(initialState)

  async function handlePostCreate(info) {
    info.userId = await props.user.data.session_id
    await props.createNewPost(info)
    const recentPostInfo = await props.createPost
    if (recentPostInfo.error !== null) {
      alert(recentPostInfo.error.toString())
      return
    }
    alert('Succesfully Created new Post')
  }

  function renderTabValue() {
    let { selectedTabIndex } = state
    selectedTabIndex = Number(selectedTabIndex)
    return tabsItems[selectedTabIndex]
  }

  function getaActive(index) {
    if (index === state.selectedTabIndex)
      return props.style.activeIcon
    return props.style.icon
  }

  function renderHeader() {
    let { selectedTabIndex } = state
    const displayContent = renderTabValue()
    const StatusBarStyle = Platform.OS === 'ios' ? 'light-content' : 'light-content'

    // Create Post Header
    if (state.showPost) {
      return (
        <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
          <Left style={{ flex: 0.5 }}>
            <Button
              transparent
              onPress={() => setState({ ...state, showPost: false })}>
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
              onPress={() => setState({ ...state, showPost: false })}>
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
            <Ionicon name="ios-search" />
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
          {props.user.data !== undefined &&
            props.user.data.user_type !== 'User' ? (
              <Button transparent onPress={() => setState({ ...state, showPost: true })}>
                <Ionicon name="add-circle-outline" color="#fff" style={styles.fs25} />
              </Button>
            ) : null}
        </Right>
      </Header>
    )
  }

  function renderTabs() {
    let { selectedTabIndex } = state
    if (selectedTabIndex === 0)
      return (
        <Home
          showPost={state.showPost}
          posts={state.posts}
          onHomePostSend={(data) => handlePostCreate(data)}
          postTypes={state.postTypes}
          loading={state.loading}
          postLoading={state.postLoading}
        />
      )
    if (selectedTabIndex === 2) return <Search />
    if (selectedTabIndex === 3) return <Notification />
    if (selectedTabIndex === 4) return <Profile />
    return <Text>Hash</Text>
  }

  const { style } = props

  return (
    <Container style={style.container}>
      {renderHeader()}
      {state.loading ? (
        <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} />
      ) : null}
      <Content>{renderTabs()}</Content>
      <Footer style={style.common}>
        <FooterTab style={style.common}>
          <Button onPress={() => setState({ ...state, selectedTabIndex: 0 })}>
            <Ionicon name="home" style={getaActive(0)} />
          </Button>
          <Button onPress={() => setState({ ...state, selectedTabIndex: 1 })}>
            <Faicon name="hashtag" style={getaActive(1)} />
          </Button>
          <Button onPress={() => setState({ ...state, selectedTabIndex: 2 })}>
            <Ionicon name="search-outline" style={getaActive(2)} />
          </Button>
          <Button
            badge
            vertical
            onPress={() => setState({ ...state, selectedTabIndex: 3 })}>
            <View style={{ position: 'absolute', top: 2 }}>
              <Badge>
                <Text>52</Text>
              </Badge>
            </View>
            <Ionicon name="notifications-outline" style={getaActive(3)} />
          </Button>
          <Button onPress={() => setState({ ...state, selectedTabIndex: 4 })}>
            <Ionicon name="person-outline" style={getaActive(4)} />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default connect(
  (state) => ({
    user: state.user,
    posts: state.posts.posts,
    createPost: state.createPost,
    postTypes: state.postTypes,
  }),
  {
    createNewPost,
    loadPostTypes,
  },
)(Dashboard) 
