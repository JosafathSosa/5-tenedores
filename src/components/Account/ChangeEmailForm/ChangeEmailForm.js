import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./ChangeEmailForm.styles";
import { Input, Button, Icon } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import Toast from "react-native-toast-message";

export function ChangeEmailForm(props) {
  const { onClose, onReload } = props;
  const [showPassword, setShowPassword] = useState(false);

  const showHiidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (datos) => {
      try {
        const currentUser = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          datos.password
        );
        reauthenticateWithCredential(currentUser, credential);
        await updateEmail(currentUser, datos.email);
        onClose();
        onReload();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al cambiar el email",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nuevo email"
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Introduce tu contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            onPress={showHiidenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
