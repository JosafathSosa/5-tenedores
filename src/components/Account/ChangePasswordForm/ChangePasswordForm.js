import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./ChangePasswordForm.styles";
import { Input, Button, Icon } from "@rneui/base";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./ChangePasswordForm.data";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import Toast from "react-native-toast-message";

export function ChangePasswordForm(props) {
  const { onClose } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowHiddenPass = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );
        reauthenticateWithCredential(currentUser, credentials);
        await updatePassword(currentUser, formValue.newPassword);
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "No se pudo cambiar la contraseña",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            color="#c1c1c1"
            onPress={onShowHiddenPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            color="#c1c1c1"
            onPress={onShowHiddenPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Repite nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            color="#c1c1c1"
            onPress={onShowHiddenPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
      />
    </View>
  );
}
