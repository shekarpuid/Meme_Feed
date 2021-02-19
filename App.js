import React from 'react'
import { Provider } from 'react-redux'
import Routes from './src/routes/routes'
import configureStore from './src/configureStore'
import { StatusBar } from 'react-native'

const store = configureStore()

const App = () => {
  const StatusBarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'
  return (
    <>
      <StatusBar barStyle={StatusBarStyle} backgroundColor="#00639c" />
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  )
}

export default App