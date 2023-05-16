import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./PhotoCarousel.styles";
import { Image } from "@rneui/base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";

export function PhotoCarousel(props) {
  const { arrayImages, width, height, hideDots } = props;
  //console.log(arrayImages);

  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.content}>
      <Carousel
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
