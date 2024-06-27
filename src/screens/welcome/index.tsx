import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { styles } from "./styles";

const WelcomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text>WelcomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
