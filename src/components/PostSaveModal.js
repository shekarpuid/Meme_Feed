import React, { memo, useState, useEffect } from 'react'
import { Modal, View, Image, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native'
import { Header, Right, Left, Body, Button, Title, Text, Content, Item, Picker } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { env } from '../env'
import { encode } from 'base-64'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../styles/common'

const PostSaveModal = (props) => {
    const { postSaveModal, setPostSaveModal, post, user, start, end } = props
    const StatusBarStyle = Platform.OS === 'ios' ? 'light-content' : 'light-content'
    const [selected, setSelected] = useState('select')
    const [albumNames, setAlbumNames] = useState([])
    const [inputShow, setInputShow] = useState(false)
    const [value, setValue] = useState('')
    const { width, height } = useWindowDimensions()

    useEffect(() => {
        fetchAlbumNameList()
        return () => {
            setSelected('select')
        }
    }, [])

    // album/album_name_list
    const fetchAlbumNameList = async (id, value) => {
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

            const url = `${env.baseUrl}album/album_name_list` // get album_name_list api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            // alert(JSON.stringify(res))
            // console.log("album_name_list: " + JSON.stringify(res.data))
            // alert(res.msg)
            setAlbumNames(res.data)
        } catch (error) {
            // alert(error)
            console.error(error)
        }
    }

    // createAlbumNameHandler
    const createAlbumNameHandler = async () => {
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
            formData.append('name', value)
            // console.log(JSON.stringify(formData))

            const url = `${env.baseUrl}album/album_list` // get album_list api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            alert(JSON.stringify(res.msg))
            // console.log("album_list: " + JSON.stringify(res.data))
            // alert(res.msg)
            setAlbumNames(res.data)
            setInputShow(false)
            setValue('')
        } catch (error) {
            alert(error)
            console.error(error)
            setInputShow(false)
            setValue('')
        }
    }

    const savePostHandler = async () => {
        setInputShow(false)
        if (selected === 'select') {
            alert('Please select album')
            return
        }
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
            formData.append('post_id', post.id)
            formData.append('album_name', selected)
            formData.append('from', start - 10)
            formData.append('to', end - 10)
            // console.log(JSON.stringify(formData))

            const url = `${env.baseUrl}album/album_list` // save post to album_list api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            // console.log("save post data: " + JSON.stringify(res.data))
            alert(res.msg)
            setPostSaveModal(false)
            setSelected('select')
        } catch (error) {
            alert(error)
            console.error(error)
            setPostSaveModal(false)
            setSelected('select')
        }
    }

    const onValueChange = value => {
        setSelected(value)
    }

    return (
        <Modal
            animationType="slide"
            // transparent={true}
            visible={postSaveModal}
            onRequestClose={() => {
                setPostSaveModal(false)
                setSelected('select')
            }}>
                {/* Header */}
            <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                <Left style={{ flex: 0.5 }}>
                    <Button
                        transparent
                        onPress={() => {
                            setPostSaveModal(false)
                            setSelected('select')
                        }}>
                        <Ionicon name="arrow-back-outline" color="#fff" style={styles.fs25} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontWeight: 'bold', alignSelf: 'center', marginLeft: -40 }}>Save Post to Album</Title>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button
                        transparent
                        onPress={() => {
                            setPostSaveModal(false)
                            setSelected('select')
                        }}>
                        <Ionicon name="close" color="#fff" style={styles.fs25} />
                    </Button>
                </Right>
            </Header>

            <Content>
                <View style={{ padding: 20 }}>
                    {/* Picker */}
                    {albumNames.length === 0 ? <Text style={{ color: 'red', fontSize: 12, alignSelf: 'center', marginBottom: 15 }}>You don't have albums. Please create new album(s).</Text> :
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: width - 40 }}>
                            <Item picker style={{
                                height: 45,
                                backgroundColor: '#ddd', paddingHorizontal: 10, width: width - 170,
                                marginBottom: 25, borderRadius: 5, borderStyle: 'solid', borderWidth: 1,
                                borderColor: '#ddd'
                            }}>
                                <Picker
                                    mode="dropdown"
                                    style={{ width: '100%' }}
                                    selectedValue={selected}
                                    onValueChange={(e) => onValueChange(e)}
                                >
                                    <Picker.Item label="Select" value="select" />
                                    {albumNames.length > 0 ? albumNames.map(album => {
                                        return <Picker.Item key={album.id} label={album.name} value={album.name} />
                                    }) : null}
                                </Picker>
                            </Item>

                            <TouchableOpacity
                                onPress={() => savePostHandler()}
                                style={{
                                    paddingHorizontal: 20, backgroundColor: '#00639c', justifyContent: 'center',
                                    borderRadius: 8, alignItems: 'center', height: 45
                                }}
                            >
                                <Text style={{ color: '#fff' }}>Save Post</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {/* Create Album */}
                    <View>
                        
                        {/* Create Album button */}
                        <TouchableOpacity
                            onPress={() => {
                                setInputShow(true)
                                setSelected('select')
                            }}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#00639c', borderRadius: 8, width: 200, alignItems: 'center' }}
                        >
                            <Text style={{ color: '#fff' }}>Create New Album</Text>
                        </TouchableOpacity>
                        
                        {/* Create Album Input */}
                        {inputShow ?
                            <View style={{ marginVertical: 15 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 15 }}>Create Album :</Text>
                                <TextInput
                                    onChangeText={text => setValue(text)}
                                    value={value}
                                    placeholder="Album name"
                                    placeholderTextColor="#999"
                                    style={{
                                        width: '100%', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 15,
                                        borderRadius: 8, borderWidth: 1, borderStyle: 'solid', borderColor: '#ddd'
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => createAlbumNameHandler()}
                                    style={{
                                        paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#00639c',
                                        borderRadius: 8, alignItems: 'center', alignSelf: 'flex-end'
                                    }}
                                >
                                    <Text style={{ color: '#fff' }}>Create</Text>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </View>
                </View>
            </Content>
        </Modal>
    )
}

export default memo(PostSaveModal)