import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { size, map } from "lodash";
import { RestaurantRankink } from "../components/Restaurants";
import { db } from "../utils";

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "Restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snap) => {
      setRestaurants(snap.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(restaurants, (restaurante, index) => (
        <RestaurantRankink
          key={index}
          index={index}
          restaurante={restaurante.data()}
        />
      ))}
    </ScrollView>
  );
}
