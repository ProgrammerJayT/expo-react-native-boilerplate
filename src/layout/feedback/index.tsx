import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import SpinnerComponent from "../spinner";
import FeedbackComponentsStateContext, {
  FeedbackComponentsStateContextType,
} from "../../context/feedback";
import { styles } from "./styles";

const FeedbackComponentsContainer: React.FC = () => {
  const feedbackComponentsStateContext = useContext(
    FeedbackComponentsStateContext
  );

  if (!feedbackComponentsStateContext) {
    throw new Error("Please wrap App.tsx with the context");
  }

  const { lottieLoading } =
    feedbackComponentsStateContext as FeedbackComponentsStateContextType;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {lottieLoading?.visible && <SpinnerComponent />}
      </View>
    </SafeAreaView>
  );
};

export default FeedbackComponentsContainer;
