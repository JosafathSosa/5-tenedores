import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, Text } from "@rneui/base";
import { getAuth, updateProfile } from "firebase/auth";
import { styles } from "./InfoUser.styles";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;

  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText("Cambiando avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
      //console.log(snapshot.metadata);
    });
  };

  const updatePhotoUrl = async (ImagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, ImagePath);

    const imageUrl = await getDownloadURL(imageRef);

    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });

    setAvatar(imageUrl);
    setLoading(false);
    //console.log(ImagePath);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size={100}
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={30} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
