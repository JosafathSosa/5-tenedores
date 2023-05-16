import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Image } from "@rneui/base";
import { styles } from "./UserGuestScreen.styles";

import { screen } from "../../../utils";

import { useNavigation } from "@react-navigation/native";

export function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar perfil</Text>
      <Text style={styles.mensaje}>
        Entra al mundo de la comida con esta app que te permite encontrar lo que
        mas te gusta
      </Text>

      <Button
        title="Ver tu perfil"
        onPress={goToLogin}
        buttonStyle={styles.btn}
      />
    </ScrollView>
  );
}
