import React from "react";
import { View } from "react-native";
import { Text, Icon } from "@rneui/base";
import { styles } from "./NotFoundRestaurants.styles";

export function NotFoundRestaurants() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.text}>
        No tienen restaurantes en la lista de favoritos
      </Text>
    </View>
  );
}
