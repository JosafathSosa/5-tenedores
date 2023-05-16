import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { styles } from "./RestaurantScreen.styles";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { PhotoCarousel, Loading, Map } from "../../../components/Shared";
import {
  Header,
  Info,
  BtnReviewForm,
  Reviews,
  BtnFavorite,
} from "../../../components/Restaurant";

export function RestaurantScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);

  const { width } = Dimensions.get("window");

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "Restaurants", route.params.id), (doc) => {
      // console.log(doc.data());
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  if (!restaurant) return <Loading show text="Cargando restaurantes" />;

  return (
    <ScrollView style={styles.content}>
      <PhotoCarousel
        arrayImages={restaurant.images}
        width={width}
        height={250}
      />
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
      <BtnReviewForm idRestaurant={restaurant.id} />
      <Reviews idRestaurant={route.params.id} />
      <BtnFavorite idRestaurant={route.params.id} />
    </ScrollView>
  );
}
