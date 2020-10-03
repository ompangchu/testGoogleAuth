import React, { Component } from 'react';
import {TouchableOpacity, View, Text  , StyleSheet} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

class App extends Component {
  state = {
    isLogin: false,
    currentUser: '',
  };
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: 'YOUR_ID',//client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
    });
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ isLogin:userInfo });
      // this.getCurrentUser();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ isLogin: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({ currentUser:currentUser });
    console.log("user : " + currentUser);
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        {
          this.state.isLogin? 
          (
            <View style={styles.viewStyle}>
             
              <TouchableOpacity style={styles.loginButtonStyle} 
                onPress={() => {
                  this.signOut();
                }}>
                <Text >
                  {this.state.currentUser} is logout
                </Text>
              </TouchableOpacity>
          </View>
          
          ) : 
          (
            <View style={styles.viewStyle}>

            <Text>Hello, I am your cat!</Text>
            <View style={styles.loginButtonContainerStyle}>
              <GoogleSigninButton
              style={{ width: 230, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => {
                this.signIn();
                // this.getCurrentUser();
              }} />
            </View>
          </View>
          )
        }
       
        
      </View>

    );
  }
}


const baseMargin = 5;
const doubleBaseMargin = 10;
const blue = "#ff0000";
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButtonContainerStyle: {
    flex: 0.2,
    paddingHorizontal: baseMargin,
    justifyContent: "center",
    alignItems: "center"
  },
  
  loginButtonStyle: {
    alignItems: "center"
  },
});

export default App;
