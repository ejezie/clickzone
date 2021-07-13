import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import LandingPage from "./component/Auth/Landing";
import SignUpPage from "./component/Auth/SignUp";
import LoginPage from "./component/Auth/Login";


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
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export default function App() {
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
