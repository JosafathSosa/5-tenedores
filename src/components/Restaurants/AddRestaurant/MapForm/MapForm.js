import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "@rneui/base";
import { Modal } from "../../../Shared/Modal";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./MapForm.styles";

export function MapForm(props) {
  const { show, close, formik } = props;
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Se necesitan permiso para acceder a al localizacion",
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };

  return (
    <Modal show={show} clse={close}>
      <View>
        <MapView
          initialRegion={location}
          showsUserLocation={true}
          style={styles.mapStyle}
          onRegionChange={(locationTemp) => setLocation(locationTemp)}
        >
          <Marker draggable coordinate={location} />
        </MapView>

        <View style={styles.mapActions}>
          <Button
            title="Guardar "
            containerStyle={styles.btnMapContainerSave}
            buttonStyle={styles.btnMapSave}
            onPress={saveLocation}
          />
          <Button
            title="Cerrar "
            containerStyle={styles.btnMapContainerCancel}
            buttonStyle={styles.btnMapCancel}
            onPress={close}
          />
        </View>
      </View>
    </Modal>
  );
}
