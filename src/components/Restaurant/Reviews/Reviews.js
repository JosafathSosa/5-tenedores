import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./Reviews.styles";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Loading } from "../../Shared";
import { Text, AirbnbRating, ListItem, Avatar } from "@rneui/base";
import { map } from "lodash";
import { DateTime } from "luxon";
import "intl";
import "intl/locale-data/jsonp/es";

export function Reviews(props) {
  const [reviews, setReviews] = useState(null);
  const { idRestaurant } = props;

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", idRestaurant),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setReviews(data);
    });
  }, []);

  if (!reviews) return <Loading show text="Cargando" />;

  return (
    <View style={styles.content}>
      {map(reviews, (review) => {
        const reviewData = review;
        const fecha = new Date(reviewData.createdAt.seconds * 1000);

        return (
          <ListItem
            key={reviewData.id}
            bottomDivider
            containerStyle={styles.review}
          >
            {<Avatar source={{ uri: reviewData.avatar }} size={50} rounded />}
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {reviewData.title}
              </ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{reviewData.comment}</Text>
                <View style={styles.contentRating}>
                  <AirbnbRating
                    defaultRating={reviewData.rating}
                    showRating={false}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.starContainer}
                  />
                  <Text style={styles.date}>
                    {DateTime.fromISO(fecha.toISOString()).toFormat(
                      "yyyy/LL/dd - HH:mm"
                    )}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
