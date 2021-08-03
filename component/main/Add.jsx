import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { RNCamera as Camera } from "react-native-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null);
      setImage(data.uri); 
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View >
      <Camera type={type} style={styles.contain} ref = {ref => setCamera(ref)}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text> <MaterialCommunityIcons name="camera-switch-outline" color="white" size={26} /> </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Button onPress={() => takePicture()} title="Snap"/>
      {/* <MaterialCommunityIcons name="camera" color="white" size={26} /> */}
      {image && <Image source={{uri: image}} style={{flex:1, marginBottom:70,}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex:1,
    aspectRatio: 1,
  },
  fixedRatio:{
    flex: 1,
    aspectRatio: 1,
  }
});
