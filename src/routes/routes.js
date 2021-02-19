import React, { Fragment } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import MIcon from 'react-native-vector-icons/dist/MaterialIcons'

// import Dashboard from './Dashboard'
import BasicLogin from './BasicLogin'
import BasicInformation from './BasicInformation'
import BasicUpload from './BasicUpload'
import RequestCode from './RequestCode'
import ValidateCode from './ValidateCode'
import AddPhone from './AddPhone'
import Splash from './Splash'
import Sliders from './Sliders'
import ContinueOptions from './ContinueOptions'
import CreateUserId from './CreateUserId'
// import { NativeRouter, Route } from 'react-router-native'
import Main from './Main/Main'
import ForgotPassword from './ForgotPassword'
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'
import ChangeDisplayPicture from './ChangeDisplayPicture'
import ChangeHandleName from './ChangeHandleName'
import AccountUpgadation from './AccountUpgadation'
import ChangePrivacy from './ChangePrivacy'
import ManageBlockList from './ManageBlockList'
import DrawerContent from '../components/DrawerContent'
import DeleteAccount from './DeleteAccount'

// Stacks
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function Routes(props) {
  const { user } = props

  function DrawerRoutes(props) {
    return (
      <Drawer.Navigator 
        initialRouteName="Main" 
        drawerContent={props => <DrawerContent {...props} />}
        drawerContentOptions
      // <Drawer.Navigator initialRouteName="Main"
        drawerContentOptions={{
          activeTintColor: '#fff',
          activeBackgroundColor: '#00639c',
          inactiveTintColor: '#333',
          inactiveBackgroundColor: '#fff',
          labelStyle: {
            marginLeft: -15, marginRight: -25
          }
        }}
      >
        {/* <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="ChangeName" component={ChangeName} />
        <Drawer.Screen name="ChangeHandleName" component={ChangeHandleName} />
        <Drawer.Screen name="ChangeDisplayPicture" component={ChangeDisplayPicture} />
        <Drawer.Screen name="AccountUpgadation" component={AccountUpgadation} />
        <Drawer.Screen name="ChangePrivacy" component={ChangePrivacy} />
        <Drawer.Screen name="DeleteAccount" component={DeleteAccount} />
        <Drawer.Screen name="ManageBlockList" component={ManageBlockList} /> */}
        <Drawer.Screen name="Main" component={Main}
          options={{
            drawerLabel: 'Home', activeTintColor: '#00639c', inactiveTintColor: '#fff',
            drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-home-outline' : 'ios-home-outline'} />
          }}
        />
        <Drawer.Screen name="Change Name" component={ChangeName}
          options={{
            drawerLabel: 'Change Name',
            drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-person-outline' : 'ios-person-outline'} />
          }}
        />
        <Drawer.Screen name="ChangeHandleName" component={ChangeHandleName}
          options={{
            drawerLabel: 'Change Handle Name',
            drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-person-add-outline' : 'ios-person-add-outline'} />
          }}
        />
        <Drawer.Screen name="ChangeDisplayPicture" component={ChangeDisplayPicture}
          options={{
            drawerLabel: 'Change Display Picture',
            drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-image-outline' : 'ios-image-outline'} />
          }}
        />
        <Fragment>
          {user.data.login_with === 'signup' ?

            <Drawer.Screen name="ChangePassword" component={ChangePassword}
              options={{
                drawerLabel: 'Change Password',
                drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-lock-closed-outline' : 'ios-lock-closed-outline'} />
              }}
            /> : null}
        </Fragment>
        <Drawer.Screen name="AccountUpgadation" component={AccountUpgadation}
          options={{
            // drawerLabel: 'Request for the Upgradation to Creator Account',
            drawerLabel: ({focused}) => <Text style={{color: focused ? '#fff' : '#333', marginLeft: -15, marginRight: -25}}>Request for the Upgradation to Creator Account</Text>,
            drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-school-outline' : 'ios-school-outline'} />
          }}
        />
        <Drawer.Screen name="ChangePrivacy" component={ChangePrivacy}
          options={{
            // drawerLabel: 'Change Account privacy Private or Public',
            drawerLabel: ({focused}) => <Text style={{color: focused ? '#fff' : '#333', marginLeft: -15, marginRight: -25}}>Change Account Privacy to Private or Public</Text>,
            drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-lock-open-outline' : 'ios-lock-open-outline'} />
          }}
        />
        <Drawer.Screen name="DeleteAccount" component={DeleteAccount}
          options={{
            drawerLabel: 'Delete Account',
            drawerIcon: ({ focused }) => <Ionicon size={20} color={focused ? '#fff' : '#333'} name={Platform.OS === 'android' ? 'md-trash-outline' : 'ios-trash-outline'} />
          }}
        />
        <Drawer.Screen name="ManageBlockList" component={ManageBlockList}
          options={{
            drawerLabel: 'Manage Block List',
            drawerIcon: ({ focused }) => <MIcon size={20} color={focused ? '#fff' : '#333'} name={'block'} />
          }}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
        <Stack.Screen name="BasicLogin" component={BasicLogin}></Stack.Screen>
        <Stack.Screen name="ContinueOptions" component={ContinueOptions}></Stack.Screen>
        <Stack.Screen name="RequestCode" component={RequestCode}></Stack.Screen>
        <Stack.Screen name="ValidateCode" component={ValidateCode}></Stack.Screen>
        <Stack.Screen name="AddPhone" component={AddPhone}></Stack.Screen>
        <Stack.Screen name="BasicInformation" component={BasicInformation}></Stack.Screen>
        <Stack.Screen name="BasicUpload" component={BasicUpload}></Stack.Screen>
        <Stack.Screen name="CreateUserId" component={CreateUserId}></Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
        <Stack.Screen name="Main" component={DrawerRoutes} options={{ title: 'Home' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// const Routes = () => {
//   return (
//     <NativeRouter>
//       <Route exact path="/" component={Splash} />
//       <Route exact path="/sliders" component={Sliders} />
//       <Route exact path="/continue-options" component={ContinueOptions} />
//       <Route path="/request-code" component={RequestCode} />
//       <Route path="/validate-code" component={ValidateCode} />
//       <Route path="/add-phone" component={AddPhone} />
//       <Route path="/basic-information" component={BasicInformation} />
//       <Route path="/basic-upload" component={BasicUpload} />
//       <Route path="/create-userid" component={CreateUserId} />
//       <Route path="/basic-login" component={BasicLogin} />
//       {/* <Route path="/dashboard" component={Dashboard} /> */}
//       <Route path="/dashboard" component={Main} />
//       <Route path="/forgotpassword" component={ForgotPassword} />
//     </NativeRouter>
//   ) 
// } 

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // handleSetUserData: setUserData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)