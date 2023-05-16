import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/base";
import { styles } from "./Header.styles";
import { Rating } from "react-native-rating-element";

export function Header(props) {
  const { restaurant } = props;

  const ratingProps = {};
  console.log(restaurant);
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating size={24} readonly rated={restaurant.ratingMedia | 0} />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
