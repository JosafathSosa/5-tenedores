import React, { useState } from "react";
import { View } from "react-native";
import { InfoUser, AccountOptions } from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@rneui/base";
import { LoadingModal } from "../../../components";

export function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("second");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions onReload={onReload} />

      <Button
        title="Cerrar sesion"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.textBtn}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
