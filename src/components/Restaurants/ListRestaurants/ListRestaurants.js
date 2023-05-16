import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "@rneui/base";
import { styles } from "./ListRestaurants.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function ListRestaurants(props) {
  const { restaurants } = props;
  const navigation = useNavigation();

  const goToRestaurant = (restaurant) => {
    navigation.navigate(screen.restaurant.restaurant, { id: restaurant.id });
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          const restaurant = doc.item;
          //console.log(restaurant.images);
          return (
            <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
              <View style={styles.restaurant}>
                <Image
                  source={{ uri: restaurant.images[0] }}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.name}>{restaurant.name}</Text>
                  <Text style={styles.info}>{restaurant.address}</Text>
                  <Text style={styles.info}>{restaurant.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
