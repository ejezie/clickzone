import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { RNCamera as Camera } from "react-native-camera";

export default function Add({navigation}) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
      n;
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (cameraPermission === null || galleryPermission === false) {
    return <View />;
  }
  if (cameraPermission === false || galleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View type={type} style={styles.CamContain}>
      <Camera
        ref={(ref) => setCamera(ref)}
        type={type}
        style={styles.fixedRatio}
        ratio={"1:1"}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text>
              {" "}
              <MaterialCommunityIcons
                name="camera-switch-outline"
                color="white"
                size={26}
              />{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Button onPress={() => takePicture()} title="Snap" />
      <Button onPress={() => pickImage()} title="Select From Gallery" />
      <Button
        onPress={() => navigation.navigate("Save", { image })}
        title="Save"
      />
      {/* <MaterialCommunityIcons name="camera" color="white" size={26} /> */}
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  CamContain: {
    flex: 1,
    // width: 100,
    // flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1.1,
  },
});
