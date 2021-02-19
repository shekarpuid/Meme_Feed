import React, { useEffect } from 'react'
import { Container, Content, Text, Thumbnail, Icon, Button } from 'native-base'
import { View } from 'react-native'
import defaultAvatar from '../../../assets/grayman.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../../styles/common'
import { googleSignOut, fbSignOut } from '../../utils'
import {env} from '../../env'

const Profile = (props) => {
	const { setSelectedTabIndex, getaActive, user } = props
    const imageUrl = `${env.baseUrl}${user.data.profile_image}`

	useEffect(() => {
		// console.log(JSON.stringify(user))
		console.log(user.data.profile_image)
	}, [])

	const signOut = async () => {
		try {
			if (user.data.login_with === 'gmail') {
				googleSignOut()
			} else if (user.data.login_with === 'facebook') {
				fbSignOut()
			}
			await AsyncStorage.removeItem('userData')
			setSelectedTabIndex(0)
			getaActive(0)
		} catch (error) {
			alert("User data not removed.")
		}
	}

	const renderHeader = () => {
		return (
			<View style={{ height: 140, width: "100%", flexDirection: 'row', borderBottomColor: '#808080', borderBottomWidth: 2 }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
					<Thumbnail
						style={{ borderWidth: 5, borderColor: '#00639c' }}
						large
						// source={{uri: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70'}}
						source={
							user.data.profile_image === null || user.data.profile_image === undefined ? defaultAvatar :
							user.data.login_with === 'gmail' || user.data.login_with === 'facebook' ? { uri: user.data.profile_image } :
							user.data.profile_image.length > 0 ? { uri: imageUrl } :
							defaultAvatar}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<View>
							<Text style={{ fontWeight: 'bold' }}>{user.data.name}</Text>
							<Text style={{ fontWeight: 'bold', color: '#808080', fontSize: 15 }}>{user.data.handle_name}</Text>
						</View>
						<View>
							<Ionicon name='notifications' style={{ fontSize: 30 }} />
						</View>
						<View>
							<Ionicon name='chatbubble-ellipses-outline' style={{ fontSize: 30 }} />
						</View>
						<View>
							<Icon name='thumbs-up-sharp' />
						</View>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={styles.profileIconBtn}>
								<Text style={{ fontWeight: 'bold' }}>Upvotes</Text>
							</View>
							<Text style={{ fontWeight: 'bold' }}>180</Text>

						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={styles.profileIconBtn}>
								<Text style={{ fontWeight: 'bold' }}>Following</Text>
							</View>
							<Text style={{ fontWeight: 'bold' }}>108</Text>

						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={styles.profileIconBtn}>
								<Text style={{ fontWeight: 'bold' }}>Followers</Text>
							</View>
							<Text style={{ fontWeight: 'bold' }}>450</Text>

						</View>
					</View>

				</View>


			</View>
		)
	}

	return (
		<Container>
			<Content>
				{renderHeader()}
				<View style={{ borderBottomWidth: 2, borderBottomColor: '#808080', padding: 10, marginBottom: 20 }}><Text style={{ alignSelf: 'center' }}>Albums</Text></View>

				<View style={{ marginTop: '16%', justifyContent: 'center', alignItems: 'center' }} >
					<View style={{ borderWidth: 2, borderColor: '#808080', marginBottom: 20, width: 180, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Handle name: {user.data.handle_name}</Text>
						<Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>Login with: {user.data.login_with}</Text>
					</View>
					{/* <View style={{ marginTop: 20 }}>
						<Button block info onPress={() => signOut()}>
							<Text>Signout</Text>
						</Button>
					</View> */}
				</View>
			</Content>

		</Container>
	)
}

export default Profile 
