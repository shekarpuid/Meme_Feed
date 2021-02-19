import React, { useState, useEffect } from 'react'
import { Text, H3, Item, Picker, Icon, Textarea, Spinner } from 'native-base'
import { Image, TouchableOpacity, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import RNFetchBlob from 'rn-fetch-blob'
import DefaultPostImage from '../../../assets/post.png'
import GrayMan from '../../../assets/grayman.png'
// import ImagePicker from 'react-native-image-picker'
import { env } from '../../env'
import { sendPostEmpty } from '../../actions/editPostActions'
import ImagePicker from 'react-native-image-crop-picker'
import styles from '../../styles/common'
import { Button } from '../../components/index'

const CreatePost = props => {
  const [state, setState] = useState({
    selected2: '',
    avatarSource: '',
    imagedata: null,
    description: '',
  })

  const post = props.post
  const [postImage, setPostImage] = useState(null)
  const [postImageSelected, setPostImageSelected] = useState(false)
  const [profileImage, setProfileImage] = useState('')
  const userImage = `${env.baseUrl}${props.user.data.profile_image}`
  const { style } = props

  const HASHTAG_FORMATTER = string => {
    return string.split(/((?:^|\s)(?:#[a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
      if (v.includes('#')) {
        return <Text key={i} style={{ color: '#00639c', fontWeight: 'bold' }}>{v}</Text>
      } else {
        return <Text key={i}>{v}</Text>
      }
    })
  };

  useEffect(() => {
    if (post !== undefined) {
      // alert(JSON.stringify(props.post))
      setPostImage(`${env.baseUrl}${post.post_image}`)
      setProfileImage(`${env.baseUrl}${post.profile_image}`)
      setState({ ...state, selected2: post.post_type_id, description: post.post_description })
      // console.log(JSON.stringify(props.user))
    }
    return () => {
      // alert('unmount')
      props.dispatch(sendPostEmpty())
      props.setEditing(false)
    }
  }, [])

  function onValueChange2(value) {
    setState({ ...state, selected2: value, })
  }

  async function handlePost() {
    const { selected2, imagedata, description } = await state
    if (selected2 === '' || selected2 === 'select') {
      alert('Please Select Type of Post')
      return
    }
    if (imagedata === null && !post) {
      alert('Please upload Image')
      return
    }
    if (description === '') {
      alert('Please Enter Post description')
      return
    }
    let requestObj = {}

    if (props.editing) {
      let post_image = ''
      if (props.editing && state.avatarSource !== '') {
        post_image = state.imagedata
      } else {
        let base64Image = ''
        await RNFetchBlob.fetch('GET', postImage)
          .then(res => base64Image = res.base64())
          .catch(errorMessage => console.log(errorMessage))
        post_image = base64Image
      }
      requestObj = {
        post_image: post_image,
        ptypeId: selected2,
        user_id: props.user.data.session_id,
        post_id: post.id,
        post_description: description
      }
    } else {
      requestObj = {
        post_description: description,
        post_image: imagedata,
        ptypeId: selected2,
        userId: props.user.data.session_id,
        post_id: 0
      }
    }
    
    await props.onPostSend(requestObj)
    props.setEditing(false)
    props.setNewPost(true)
    props.newPostFetch()
    // props.fetchData()
    // props.setStart(0)
    // props.setEnd(9)
  }

  const handleImageUpload = () => {
    const options = {
      title: 'Select Image',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        setState({ ...state, avatarSource: '' })
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        // console.log(source)
        // console.log(response.data)

        // You can also display the image using data:
        // const source = { uri: 'data:image/png;base64,' + response.data } 

        setState({
          ...state,
          avatarSource: source,
          imagedata: response.data
        })
        setPostImageSelected(true)
      }
    })
  }

  function renderPickerItems() {
    if (props.postTypes.data.length) {
      return props.postTypes.data.map((item) => {
        return <Picker.Item label={item.name} value={item.id} key={item.id} />
      })
    }
    return null
  }


  const onChangeHandler = async (text) => {
    let hashtagText = await HASHTAG_FORMATTER(text)
    setState({ ...state, description: text })
    // return string.replace(/(^|\s)(#[a-z\d-]+)/ig, `$1${<Text style={{ color: 'blue' }}>$2</Text>}`);
  }

  // Image crop
  const options = {
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
    // cropperCircleOverlay: true,
    mediaType: 'photo',
    showCropFrame: true,
    useFrontCamera: true,
    compressImageQuality: 0.5
  }

  const openGalleryHandler = () => {
    ImagePicker.openPicker(options).then(image => {
      // console.log(image)
      // setAvatarSource('data:image/png;base64,' + image.data)
      setState({
        ...state,
        avatarSource: image.data,
        imagedata: image.data
      })
    }).catch(error => {
      alert(error)
      console.log(error)
    })
  }

  const openCameraIHandler = () => {
    ImagePicker.openCamera(options).then(image => {
      // console.log(image)
      // setAvatarSource('data:image/png;base64,' + image.data)
      setState({
        ...state,
        avatarSource: image.data,
        imagedata: image.data
      })
    }).catch(error => {
      alert(error)
      console.log(error)
    })
  }


  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <H3
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          color: '#00639c',
          marginTop: 20,
        }}>
        Upload Image*
        </H3>

      {/* <View style={{flexDirection: 'row'}}>{HASHTAG_FORMATTER("Let's #Tweet on Twitter")}</View> */}

      {/* Upload image  */}
      {/* <TouchableOpacity onPress={handleImageUpload}
        style={{ height: 200, width: '85%', marginTop: 20, borderRadius: 5 }}> */}
        <View style={{ height: 200, width: '85%', marginVertical: 20, borderRadius: 5 }}>
        <Image
          source={
            postImageSelected ? state.avatarSource : props.editing ? { uri: postImage } : 
            state.avatarSource !== '' ? { uri: `data:image/png;base64,${state.avatarSource}`} : DefaultPostImage
          }
          resizeMode="stretch"
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
        />
        </View>
      {/* </TouchableOpacity> */}

      <View style={[{flexDirection: 'row', justifyContent: 'space-between', width: '85%'}]}>
        <Button full rounded textLight onPress={() => openCameraIHandler()} style={{fontSize: 10}}>OPEN CAMERA</Button>
        <Button full rounded textLight onPress={() => openGalleryHandler()}>OPEN GALLERY</Button>
        {/* <Button full rounded textLight style={styles.mb20} onPress={() => handleSubmit()}>SUBMIT</Button> */}
      </View>

      <Item
        picker
        style={{
          backgroundColor: '#00639c',
          width: '85%',
          marginTop: 0,
          borderRadius: 5,
        }}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          style={{ width: '85%', color: '#fff', fontWeight: 'bold' }}
          placeholder="Select type Post"
          placeholderStyle={{ color: '#fff' }}
          placeholderIconColor="red"
          selectedValue={state.selected2}
          onValueChange={onValueChange2}>
          <Picker.Item label='Select Post Type' value='select' />
          {renderPickerItems()}
        </Picker>
      </Item>
      <View
        style={{
          backgroundColor: '#808080',
          width: '100%',
          height: 1,
          marginTop: 20
        }}>
        {/* <View style={{height:90,color:'red',width:"100%"}}></View> */}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingLeft: 5,
          paddingRight: 5,
        }}>
        <Image
          // source={GrayMan}
          source={props.user.data.profile_image !== '' ? { uri: userImage } : GrayMan
            // props.editing ? profileImage : GrayMan
          }
          resizeMode="contain"
          style={{ width: 60, height: 60, borderRadius: 100 }}
        />

        <Textarea
          onChangeText={(text) => onChangeHandler(text)}
          style={{ borderColor: 'transparent', borderWidth: 1, width: '80%' }}
          rowSpan={5}
          placeholder="What's on your mind on? ( 600 characters ) Examples: @sycreator #abcdefg"
          value={state.description}
        />
      </View>

      <View
        style={{
          backgroundColor: '#808080',
          width: '100%',
          height: 1,
          marginTop: 20,
        }}>
        {/* <View style={{height:90,color:'red',width:"100%"}}></View> */}
        {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
      </View>
      <Button
        rounded
        onPress={() => handlePost()}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#00639c',
        }}>
        <Text>Post</Text>
      </Button>
      {props.postLoading ? (
        <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} />
      ) : null}
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.editPost.post
  }
}

export default connect(mapStateToProps)(CreatePost)
// export default CreatePost
