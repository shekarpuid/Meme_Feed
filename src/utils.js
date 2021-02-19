import { encode } from 'base-64'
import { GoogleSignin } from '@react-native-community/google-signin'
// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export const googleSignOut = async () => {
    // alert("Google sign out")
    try {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
    } catch (error) {
        console.error(error)
    }
}
export const fbSignOut = async () => {
    // alert("FB sign out")
    // let current_access_token = '';
    // AccessToken.getCurrentAccessToken().then((data) => {
    //   current_access_token = data.accessToken.toString();
    // }).then(() => {
    //   let logout =
    //   new GraphRequest(
    //     "me/permissions/",
    //     {
    //         accessToken: current_access_token,
    //         httpMethod: 'DELETE'
    //     },
    //     (error, result) => {
    //         if (error) {
    //             console.log('Error fetching data: ' + error.toString());
    //         } else {
    //             LoginManager.logOut();
    //         }
    //     });
    //   new GraphRequestManager().addRequest(logout).start();
    // })
    // .catch(error => {
    //   console.log(error)
    // });     
}















// not in use
export const myHeaders = () => {
    const username = 'memefeed'
    const password = 'Connect12345!'
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'multipart/form-data')
    myHeaders.append(
        'Authorization',
        `Basic ${encode(`${username}:${password}`)}`
    )
    console.log(JSON.stringify(myHeaders))
    alert(JSON.stringify(myHeaders))
    return myHeaders
}
// Http requests
export const httpFetch = async (url, options) => {
    const response = null
    const error = null
    options.headers = myHeaders
    try {
        const res = await fetch(url, options)
        const json = await res.json()
        response = json
    } catch (err) {
        console.error(err)
        error = err
    }

    return { response, error }
}