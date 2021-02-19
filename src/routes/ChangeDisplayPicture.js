import React, { useState, useEffect } from 'react'
import { Container, Content, H1 } from 'native-base'
import { Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { encode } from 'base-64'
import { env } from '../env'
import { Button } from '../components/index'
import styles from '../styles/common'
import Camera from '../../assets/camera.png'
import ImagePicker from 'react-native-image-crop-picker'
import { setUserData } from '../actions/userDataActions'

function ChangeDisplayPicture(props) {
    const { user, handleSetUserData } = props
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
                await handleSetUserData(res)
                // console.log(JSON.stringify(res))
                alert("Successfully changed profile image.")
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
        <>
            <Container style={styles.blueBg}>
                <Content style={styles.content}>
                    <H1 style={[styles.whiteTxt, styles.fBold, styles.mt30]}>Change Display Picture</H1>
                    <View style={styles.imageBox}>
                        <Image source={avatarSource.length > 0 ? { uri: avatarSource } : Camera} resizeMode="cover"
                            style={avatarSource.length > 0 ? styles.userImage : styles.image} />
                    </View>
                    <View style={styles.mb10}>
                        <Button full rounded textLight style={styles.mt10} onPress={() => openCameraIHandler()}>OPEN CAMERA</Button>
                        <Button full rounded textLight onPress={() => openGalleryHandler()}>OPEN GALLERY</Button>
                        <Button full rounded textLight style={styles.mb20} onPress={() => handleSubmit()}>SUBMIT</Button>
                    </View>
                </Content>
            </Container>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleSetUserData: setUserData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDisplayPicture)