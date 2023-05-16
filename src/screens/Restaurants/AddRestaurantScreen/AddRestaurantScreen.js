import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./AddRestaurantScreen.styles";
import {
  InfoForm,
  UploadImagesForm,
  ImageRestaurant,
} from "../../../components/Restaurants/AddRestaurant";
import { Button } from "@rneui/base";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function AddRestaurantScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuidv4();
        newData.createdAt = new Date();

        const myDB = doc(db, "Restaurants", newData.id);
        await setDoc(myDB, newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <ScrollView>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />
      <UploadImagesForm formik={formik} />

      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
