import React from 'react'
import { Text, View, Button} from "react-native"

export default function Landing({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center',}}>
            <Button title="Sign Up" onPress={()=> navigation.navigate("SignUp")}/>
            <Button title="Log In" onPress={()=> navigation.navigate("Login")}/>
        </View>
    )
}
