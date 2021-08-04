import React from "react";
import { View, TextInput, Image } from "react-native";

export default function Save(props) {
  console.log(props.route.params.image);
  return (
    <View style={{flex: 1}}>
      {/* <Text>Saved</Text> */}
      <Image source={{uri: props.route.params.image}}/>
      <TextInput placeholder="write a caption here..."/>
    </View>
  );
}
