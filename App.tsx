import React from "react";
import RouteStack from "./src/route";
import { FeedbackComponentsStateProvider } from "./src/context/feedback";
import FeedbackComponentsContainer from "./src/layout/feedback";

const App: React.FC = () => {
  return (
    <FeedbackComponentsStateProvider>
      <FeedbackComponentsContainer />
      <RouteStack />
    </FeedbackComponentsStateProvider>
  );
};

export default App;
