import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./RestaurantRankink.styles";
import { Image, Text, Icon } from "@rneui/base";
import { Rating } from "react-native-rating-element";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function RestaurantRankink(props) {
  const { restaurante, index } = props;
  const navigation = useNavigation();

  const goToRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurante.id,
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";

    if (index === 0) color = "#ffd700";
    if (index === 1) color = "#bebebe";
    if (index === 2) color = "#cd7f32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };
  return (
    <TouchableOpacity onPress={() => goToRestaurant()}>
      <View style={styles.content}>
        <Image source={{ uri: restaurante.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text>{restaurante.name}</Text>
          </View>
          <Rating size={25} readonly rated={restaurante.ratingMedia} />
        </View>
        <Text style={styles.description}>{restaurante.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
