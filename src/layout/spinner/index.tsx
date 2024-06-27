import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import SpinnerAnimation from "../../../assets/lottie/loader.json";
import { styles } from "./styles";

const SpinnerComponent: React.FC = () => {
  const animation = useRef<LottieView>(null);
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: width, height: width }}
          source={SpinnerAnimation}
        />
      </View>
    </SafeAreaView>
  );
};

export default SpinnerComponent;
