import React from 'react'
import { View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styles/common'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import MIcon from 'react-native-vector-icons/dist/MaterialIcons'
import { googleSignOut, fbSignOut } from '../utils'

const DrawerContent = (props) => {
    const { user, navigation } = props
    const Drawer = createDrawerNavigator()

    const handleSignout = async () => {
        try {
            if (user.data.login_with === 'gmail') {
                googleSignOut()
            } else if (user.data.login_with === 'facebook') {
                fbSignOut()
            }
            navigation.closeDrawer()
            await AsyncStorage.removeItem('userData')
            navigation.navigate('BasicLogin')
        } catch (error) {
            console.log(error)
            alert("User data not removed.")
        }
    }
    return (
        <View style={styles.flex1}>
            <DrawerContentScrollView {...props}>
                <View>
                <DrawerItemList {...props} />
                    {/* <DrawerItem
                        label="Home" 
                        icon={({ focused }) => (
                            <Ionicon name={Platform.OS === 'android' ? 'md-home-outline' : 'ios-home-outline'} color={focused ? 'red' : '#333'} size={20} />
                        )}
                        onPress={() => navigation.navigate('Main')}
                    />
                    <DrawerItem
                        label="Change Name" 
                        icon={({ focused }) => (
                            <Ionicon name={Platform.OS === 'android' ? 'md-person-outline' : 'ios-person-outline'} color={focused ? 'red' : '#333'} size={20} />
                        )}
                        onPress={() => navigation.navigate('ChangeName')}
                    />
                    <DrawerItem
                        label="Change Handle Name" 
                        icon={({ focused }) => (
                            <Ionicon name={Platform.OS === 'android' ? 'md-person-add-outline' : 'ios-person-add-outline'} color={focused ? 'red' : '#333'} size={20} />
                        )}
                        onPress={() => navigation.navigate('ChangeHandleName')}
                    />
                    <DrawerItem
                        label="Change Display Picture"
                        icon={({ focused }) => (
                            <Ionicon name={Platform.OS === 'android' ? 'md-image-outline' : 'ios-image-outline'} color={focused ? 'red' : '#333'} size={20} />
                        )}
                        onPress={() => navigation.navigate('ChangeDisplayPicture')}
                    />
                    <DrawerItem
                        label="Request for the Upgradation to Creator Account"
                        icon={({ focused }) => (
                            <Ionicon name={Platform.OS === 'android' ? 'md-school-outline' : 'ios-school-outline'} color={focused ? 'red' : '#333'} size={20} />
                        )}
                        onPress={() => navigation.navigate('AccountUpgadation')}
                    />
                    <DrawerItem
                        label="Change Account privacy Private or Public"
                        icon={({ focused }) => (
                            <Ionicon name={Platform.OS === 'android' ? 'md-lock-open-outline' : 'ios-lock-open-outline'} color={focused ? 'red' : '#333'} size={20} />
                        )}
                        onPress={() => navigation.navigate('ChangePrivacy')}
                    />
                    <DrawerItem
                        label="Delete Account"
                        icon={({ focused }) => (
                            <Ionicon name={Platform.OS === 'android' ? 'md-trash-outline' : 'ios-trash-outline'} color={focused ? 'red' : '#333'} size={20} />
                        )}
                        onPress={() => navigation.navigate('DeleteAccount')}
                    />
                    <DrawerItem
                        label="Manage Block List"
                        icon={({ focused }) => (
                            <MIcon size={20} color={focused ? 'red' : '#333'} name={'block'} />
                        )}
                        onPress={() => navigation.navigate('ManageBlockList')}
                    /> */}
                    <DrawerItem label={({focused}) => <Text style={{marginLeft: -15}}>Logout</Text>} inactiveTintColor="#333" labelStyle={{marginLeft: -15}} icon={({ focused }) => (
                        <Ionicon size={20} color='#333' name={Platform.OS === 'android' ? "md-log-out-outline" : "ios-log-out-outline"} />
                    )} onPress={() => handleSignout()} />
                </View>
            </DrawerContentScrollView>
            {/* Drawer bottom */}
            <View>
                {/* <DrawerItem label="Sign Out" icon={({ focused }) => (
                    <Ionicon size={20} name={Platform.OS === 'android' ? "md-log-out-outline" : "ios-log-out-outline"} />
                )} onPress={() => handleSignout()} /> */}
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleFetchPosts: fetchPosts
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)