import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./Loading.styles";
import { Text } from "@rneui/base";

export function Loading(props) {
  const { show, text } = props;

  if (!show) return null;

  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#001680" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
