import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Icon, Avatar, Text } from "@rneui/base";
import { styles } from "./UploadImagesForm.styles";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";
import { LoadingModal } from "../../../Shared";
import { map, filter } from "lodash";

export function UploadImagesForm(props) {
  const { formik } = props;

  const [isLoading, setIsLoading] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${uuidv4()}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotosRestaurants(snapshot.metadata.fullPath);
    });
  };

  const updatePhotosRestaurants = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const image = await getDownloadURL(imageRef);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setIsLoading(false);
  };

  const removeImage = (image) => {
    Alert.alert("Eliminar imagen", "¿Estas seguro de eliminar esta imagen?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () => {
          const result = filter(formik.values.images, (img) => img !== image);
          formik.setFieldValue("images", result);
        },
      },
      { cancelable: false },
    ]);
  };

  return (
    <>
      <ScrollView style={styles.viewImage} horizontal>
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>

      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  );
}
