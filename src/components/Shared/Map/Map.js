import React from "react";
import { styles } from "./Map.styles";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";

export function Map(props) {
  const { location, name } = props;
  const openAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };
  return (
    <MapView
      initialRegion={location}
      style={styles.content}
      onPress={openAppMap}
    >
      <Marker coordinate={location} />
    </MapView>
  );
}
