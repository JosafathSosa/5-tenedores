import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image } from "@rneui/base";
import { RegisterForm } from "../../../components/Auth";
import { styles } from "./RegisterScreen.styles";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/img/Cinco-Tenedores-1.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
