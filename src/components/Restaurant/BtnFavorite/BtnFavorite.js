import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./BtnFavorite.styles";
import { Icon } from "@rneui/base";

import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../utils";
import { async } from "@firebase/util";
import { size, forEach } from "lodash";

export function BtnFavorite(props) {
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [reload, setReload] = useState(false);

  const { idRestaurant } = props;
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavorite();
      if (size(response) > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    })();
  }, [idRestaurant, reload]);

  const getFavorite = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", idRestaurant),
      where("idUser", "==", auth.currentUser.uid)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const addFavorite = async () => {
    try {
      const idFavorite = uuidv4();
      const data = {
        id: idFavorite,
        idRestaurant: idRestaurant,
        idUser: auth.currentUser.uid,
      };

      await setDoc(doc(db, "favorites", idFavorite), data);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const onReload = () => setReload((prevState) => !prevState);

  const removeFavorite = async () => {
    try {
      const response = await getFavorite();
      forEach(response, async (item) => {
        await deleteDoc(doc(db, "favorites", item.id));
      });
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "red" : "black"}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
}
