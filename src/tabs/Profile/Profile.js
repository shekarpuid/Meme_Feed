import React from 'react' 
import { Container, Content, Text, Thumbnail, Icon, Button } from 'native-base' 
import { Image, View } from 'react-native' 
import Logo from '../../../assets/logo.png' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	Header,
	Link,
	nativeHistory,
	Route,
	Router,
StackRoute, withRouter, useHistory} from 'react-router-native'
const Profile = (props) => {
	const {setSelectedTabIndex, getaActive, user} = props

	const renderHeader = () => {
		return (
			<View style={{ height: 140, width: "100%", flexDirection: 'row', borderBottomColor: '#808080', borderBottomWidth: 2 }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
					<Thumbnail
						style={{ borderWidth: 5, borderColor: '#00639c' }}
						large
						source={{
							uri:
								'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
						}}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<View>
							<Text style={{ fontWeight: 'bold' }}>MachaMeme</Text>
							<Text style={{ fontWeight: 'bold', color: '#808080', fontSize: 15 }}>@sycreator</Text>


						</View>
						<View>
							<Icon name='menu' />

						</View>
						<View>
							<Icon name='menu' />

						</View>
						<View>
							<Icon name='menu' />

						</View>





					</View>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ borderWidth: 1, borderColor: '#000000', paddingLeft: 15, paddingRight: 15, borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
								<Text style={{ fontWeight: 'bold' }}>Upvotes</Text>
							</View>
							<Text style={{ fontWeight: 'bold' }}>180</Text>

						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ borderWidth: 1, borderColor: '#000000', paddingLeft: 15, paddingRight: 15, borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
								<Text style={{ fontWeight: 'bold' }}>Following</Text>
							</View>
							<Text style={{ fontWeight: 'bold' }}>108</Text>

						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ borderWidth: 1, borderColor: '#000000', paddingLeft: 15, paddingRight: 15, borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
								<Text style={{ fontWeight: 'bold' }}>Followers</Text>
							</View>
							<Text style={{ fontWeight: 'bold' }}>450</Text>

						</View>
					</View>

				</View>


			</View>
		)
	}

	const signOut = async () => {
		try {
			await AsyncStorage.removeItem('userData')
			// props.navigation.navigate('BasicLogin')
			setSelectedTabIndex(0)
			getaActive(0)
		  } catch(error) {
			// remove error
			// alert(error)
			alert("User data not removed.")
		  }
		
		  console.log('Done.')
	}

	return (
		<Container>
			<Content>
				{renderHeader()}
				<View style={{ borderBottomWidth: 2, borderBottomColor: '#808080', padding: 10, marginBottom: 20 }}><Text style={{ alignSelf: 'center' }}>Albums</Text></View>

				<View style={{ marginTop: '16%', justifyContent: 'center', alignItems: 'center' }} >
					<View style={{alignItems: 'center'}}>
						<Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Handle name: {user.data.handle_name}</Text>
						<Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>Login with: {user.data.login_with}</Text>
					</View>
					<View style={{ borderWidth: 2, borderColor: '#808080', width: 180, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Private Profile</Text>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button block info onPress={() => signOut()}>
							<Text>Signout</Text>
						</Button>
					</View>
				</View>
			</Content>
			
		</Container>
	) 
}

export default Profile 
