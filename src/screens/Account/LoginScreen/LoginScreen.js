import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Image } from "@rneui/base";
import { styles } from "./LoginScreen.styles";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/Cinco-Tenedores-1.png")}
        style={styles.image}
      />
      <View style={styles.container}>
        <LoginForm />

        <Text style={styles.textRegister}>
          ¿Aun no tienes cuenta?{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Registrarse
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
