import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { styles } from "./BtnReviewForm.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";
import { db } from "../../../utils";

export function BtnReviewForm(props) {
  const { idRestaurant } = props;
  const [hasLogged, setHasLogged] = useState(false);
  const navigation = useNavigation();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snap) => {
        const data = snap.docs.map((doc) => doc.data());

        if (size(data) > 0) {
          setHasReview(true);
        }
      });
    }
  }, [hasLogged]);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restaurant.addReviewRestaurant, {
      idRestaurant,
    });
  };

  if (hasReview && hasLogged) {
    return (
      <View style={styles.content}>
        <Text style={styles.texSend}>Ya ha sido valorado</Text>
      </View>
    );
  }
  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title="Escribe una opinion"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.title}
          onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          Para escribir una opinion necesitas iniciar sesion.{" "}
          <Text style={styles.textClick}>Pulsa para iniciar sesion</Text>
        </Text>
      )}
    </View>
  );
}
