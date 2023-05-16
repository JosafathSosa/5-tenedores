import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./InfoForm.styles";
import { Input, Icon } from "@rneui/base";
import { MapForm } from "../MapForm";

export function InfoForm(props) {
  const { formik } = props;

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  const [showMap, setShowMap] = useState(false);
  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del restaurante"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Direccion del restaurante"
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
          rightIcon={
            <Icon
              type="material-community"
              name="map-marker-radius"
              color={getColorIconMap(formik)}
              onPress={onOpenCloseMap}
            />
          }
        />
        <Input
          placeholder="Telefono"
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />

        <Input
          placeholder="Email"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />

        <Input
          placeholder="Descripcion del restaurante"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>
      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
}

const getColorIconMap = (formik) => {
  if (formik.errors.location) {
    return "#ff0000";
  } else if (formik.values.location) {
    return "#00a680";
  } else {
    return "#c2c2c2";
  }
};
