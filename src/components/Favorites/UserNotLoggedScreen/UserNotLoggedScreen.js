import React from "react";
import { View } from "react-native";
import { styles } from "./UserNotLoggedScreen.styles";
import { Text, Icon, Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function UserNotLoggedScreen() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };

  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.info}>
        Necesitas estar loggeado para poder guardar en favoritos
      </Text>
      <Button
        title="Ir a loggin"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={goToLogin}
      />
    </View>
  );
}
