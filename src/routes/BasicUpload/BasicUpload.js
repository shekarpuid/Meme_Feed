import React, { useEffect, useState } from 'react'
import { Container, Header, Content, Text, H1, H3, Form } from 'native-base'
import { Image, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { env } from '../../env'
import { encode } from 'base-64'
import ImagePicker from 'react-native-image-crop-picker'
// import ImagePicker from 'react-native-image-picker'
import styles from '../../styles/common'
import { Button } from '../../components/index'
import Camera from '../../../assets/camera.png'

const BasicUpload = (props) => {
  const { style, user } = props
  const [avatarSource, setAvatarSource] = useState('')

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
        setAvatarSource('')
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        setAvatarSource('data:image/png;base64,' + response.data)
      }
    })
  }

  const options = {
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
    cropperCircleOverlay: true,
    mediaType: 'photo',
    showCropFrame: true,
    useFrontCamera: true,
    compressImageQuality: 0.7
  }

  const openGalleryHandler = () => {
    ImagePicker.openPicker(options).then(image => {
      // console.log(image)
      setAvatarSource('data:image/png;base64,' + image.data)
    }).catch(error => {
      alert(error)
      console.log(error)
    })
  }

  const openCameraIHandler = () => {
    ImagePicker.openCamera(options).then(image => {
      // console.log(image)
      setAvatarSource('data:image/png;base64,' + image.data)
    }).catch(error => {
      alert(error)
      console.log(error)
    })
  }

  const handleSubmit = async () => {
    if (avatarSource.length === 0) {
      alert('Please choose a picture')
      return
    } else {
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
        formData.append('user_id', user.data.session_id)
        formData.append('profile_image', avatarSource)

        // console.log("formData: " + JSON.stringify(formData))

        const url = `${env.baseUrl}users/profileimg` // --> change user name, handle name, profile image api
        const response = await fetch(url, {
          method: 'POST',
          headers: myHeaders,
          body: formData
        })
        const res = await response.json()
        // console.log(JSON.stringify(res))
        alert("Successfully account created. Please signin.")
        setAvatarSource('')
        props.navigation.navigate('Main', {
          profile: true
        })
      } catch (error) {
        alert(error)
        console.error(error)
      }
    }
  }

  return (
    <Container style={style.container}>
      <Content style={style.content}>
        <H1 style={style.h1}>Upload Picture</H1>
        <View style={styles.imageBox}>
                        <Image source={avatarSource.length > 0 ? { uri: avatarSource } : Camera} resizeMode="cover"
                            style={avatarSource.length > 0 ? styles.userImage : styles.image} />
                    </View>
                    <View style={styles.mb10}>
                        <Button full rounded textLight style={styles.mt10} onPress={() => openCameraIHandler()}>OPEN CAMERA</Button>
                        <Button full rounded textLight onPress={() => openGalleryHandler()}>OPEN GALLERY</Button>
                        <Button full rounded textLight style={styles.mb10} onPress={() => handleSubmit()}>SUBMIT</Button>
                        <Button full rounded textLight style={styles.mb20} onPress={() => {
                          alert("Successfully account created. Please signin.")
                          props.navigation.navigate('BasicLogin')
                        }}>SKIP</Button>
                    </View>
        {/* <Form style={style.form}>
          <TouchableOpacity
            style={style.imageBox}
            onPress={() => handleImageUpload()}>
            <Image source={avatarSource.length > 0 ? { uri: avatarSource } : Camera} resizeMode="cover"
              style={avatarSource.length > 0 ? style.userImage : style.image} />
          </TouchableOpacity>
        </Form>
        <Button full rounded textLight onPress={() => submitUserImage()}>CONTINUE</Button>
        <Button full rounded textLight onPress={() => {
          alert("Successfully account created. Please signin.")
          props.navigation.navigate('BasicLogin')
        }}
        >SKIP</Button> */}
      </Content>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // handleCommentId: setCommentId,
    // handleFetchChildComments: fetchChildComments
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicUpload)
