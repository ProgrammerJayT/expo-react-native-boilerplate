import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SpinnerComponent from "./src/layout/spinner";
import React from "react";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <SpinnerComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
