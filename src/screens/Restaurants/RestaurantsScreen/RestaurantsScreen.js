import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/base";
//import { useNavigation } from "@react-navigation/native";
import { screen, db } from "../../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { styles } from "./RestaurantsScreen.styles";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurants } from "../../../components/Restaurants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function RestaurantsScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  const goToAddRestaurant = () => {
    // navigation.navigate(screen.restaurant.addRestaurant);
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.addRestaurant,
    });
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  useEffect(() => {
    const q = query(
      collection(db, "Restaurants"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setRestaurants(data);
    });
  }, []);

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          onPress={goToAddRestaurant}
          containerStyle={styles.btnContainer}
        />
      )}
    </View>
  );
}
