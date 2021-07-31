import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import firebase from "firebase/app";
import LandingPage from "./component/Auth/Landing";
import SignUpPage from "./component/Auth/SignUp";
import LoginPage from "./component/Auth/Login";
import MainPage from "./component/Main";

const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyDkKDLxZ9wcevCk1e5pCI8mvZDJSqX74nU",
  authDomain: "clickzone-aa668.firebaseapp.com",
  projectId: "clickzone-aa668",
  storageBucket: "clickzone-aa668.appspot.com",
  messagingSenderId: "410944697802",
  appId: "1:410944697802:web:93ea512b22b7078dd08b33",
  measurementId: "G-3KJ0XYC9V6",
};

if (firebase.apps) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>loading...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Provider store={store}>
              <MainPage />
            </Provider>
          </Stack.Navigator>
        </NavigationContainer>
        // <View>
        //   in
        // </View>
      );
    }
  }
}

export default App;
