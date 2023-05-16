import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/base";
import { styles } from "./ChangeNameForm.styles";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import { initialValues, validationSchema } from "./ChangeNameForm.data";
import Toast from "react-native-toast-message";

export function ChangeNameForm(props) {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;

        await updateProfile(currentUser, { displayName });

        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          possition: "top",
          text1: "Ha ocurrido un error al cambiar nombre y apellido",
        });
      }
    },
  });
  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y apellidos "
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre y apellido"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
