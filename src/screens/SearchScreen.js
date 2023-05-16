import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { SearchBar, ListItem, Avatar, Icon, Text } from "@rneui/themed";
import { Loading } from "../components/Shared";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db, screen } from "../utils";
import { async } from "@firebase/util";
import { size, map } from "lodash";
import { useNavigation } from "@react-navigation/native";

export function SearchScreen() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "Restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(3)
      );

      const qSnap = await getDocs(q);
      const data = qSnap.docs.map((item) => item.data());

      setSearchResults(data);
    })();
  }, [searchText]);

  const navigation = useNavigation();

  const goToRestaurant = (item) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: item,
      },
    });
  };

  return (
    <>
      <SearchBar
        placeholder="Busca el restaurante"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {!searchResults && <Loading show text="Cargando" />}

      <ScrollView>
        {size(searchResults) === 0 ? (
          <View>
            <Text>No se ha encontrado ningun resultado</Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            return (
              <ListItem
                key={item.id}
                bottomDivider
                onPress={() => goToRestaurant(item.id)}
              >
                <Avatar
                  source={{ uri: item.images[0] }}
                  containerStyle={{ width: 100, height: 100 }}
                  rounded
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
}
