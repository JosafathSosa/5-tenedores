import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./RestaurantFavorites.styles";
import { Image, Icon, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen, db } from "../../../utils";
import { doc, deleteDoc } from "firebase/firestore";

export function RestaurantFavorites(props) {
  const { restaurante } = props;
  //console.log(restaurante);
  const navigation = useNavigation();

  const goToRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurante.id,
      },
    });
  };

  const removeFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", restaurante.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image source={{ uri: restaurante.images[0] }} style={styles.images} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurante.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={removeFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
