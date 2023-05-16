import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  UserNotLoggedScreen,
  NotFoundRestaurants,
  RestaurantFavorites,
} from "./../components/Favorites";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils";
import { Loading } from "../components/Shared";
import { size, forEach, map } from "lodash";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "favorites"),
      where("idUser", "===", auth.currentUser.uid)
    );

    onSnapshot(q, async (snap) => {
      let restaurante = [];
      for await (const item of snap.docs) {
        const data = item.data();
        const docsRef = doc(db, "Restaurants", data.idRestaurant);
        const docSnap = await getDoc(docsRef);
        const newData = docSnap.data();

        newData.idFavorite = data.id;

        restaurante.push(newData);
      }
      setRestaurants(restaurante);
    });
  }, []);

  if (!hasLogged) return <UserNotLoggedScreen />;

  if (!restaurants) return <Loading show text="Cargando favoritos" />;

  if (size(restaurants) === 0) return <NotFoundRestaurants />;

  return (
    <ScrollView>
      {map(restaurants, (restaurante) => (
        <RestaurantFavorites key={restaurante.id} restaurante={restaurante} />
      ))}
    </ScrollView>
  );
}
