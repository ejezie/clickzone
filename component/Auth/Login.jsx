import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };

    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { name, email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => console.log(res)) 
    .catch(err => console.log(err))
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Your Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          placeholder="Your Password"
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
        />
        <Button title="Sign In" onPress={this.onSignUp()} />
      </View>
    );
  }
}

export default Login;
