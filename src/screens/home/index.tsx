import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import FeedbackComponentsStateContext, {
  FeedbackComponentsStateContextType,
} from "../../context/feedback";
import { styles } from "./styles";

const HomeScreen = () => {
  const feedbackComponentsStateContext = useContext(
    FeedbackComponentsStateContext
  );

  if (!feedbackComponentsStateContext) {
    throw new Error("Please wrap App.tsx with the context");
  }

  const { lottieLoading, setLottieLoading } =
    feedbackComponentsStateContext as FeedbackComponentsStateContextType;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
