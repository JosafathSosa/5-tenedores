import React from "react";
import { View } from "react-native";
import { styles } from "./AddReviewRestaurantScreen.styles";
import { Text, AirbnbRating, Input, Button } from "@rneui/base";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import Toast from "react-native-toast-message";
import {
  initialValues,
  validationSchema,
} from "./AddReviewRestaurantScreen.data";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";

export function AddReviewRestaurantScreen(props) {
  const {} = props;
  const navigation = useNavigation();
  //console.log(props.route.params.idRestaurant);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const auth = getAuth();
        const idDoc = uuidv4();
        const newData = values;

        newData.id = idDoc;
        newData.idRestaurant = props.route.params.idRestaurant;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateRestaurant();
      } catch (error) {
        // console.log(error);
        Toast.show({
          type: "error",
          position: "top",
          text1: "No se pudo añadir la review",
        });
      }
    },
  });

  const updateRestaurant = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", props.route.params.idRestaurant)
    );

    onSnapshot(q, async (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data().rating);
      const reviews = data;
      const arrayStar = map(reviews, (review) => review);

      const media = mean(arrayStar);

      //Obtengo el restaurante mediante el UID
      const restaurantRef = doc(
        db,
        "Restaurants",
        props.route.params.idRestaurant
      );

      //Actualizo ese restaurante y le paso el rating
      await updateDoc(restaurantRef, { ratingMedia: media });
      navigation.goBack();
    });
  };
  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pesimo",
              "Deficiente",
              "Normal",
              "Muy Bueno",
              "Excelente",
            ]}
            defaultRating={formik.values.rating}
            size={25}
            onFinishRating={(dato) => {
              formik.setFieldValue("rating", dato);
            }}
          />
        </View>
        <View>
          <Input
            placeholder="Title"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>
      <Button
        title="Enviar Review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
