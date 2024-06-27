import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface LottieLoading {
  visible: boolean;
}

export interface FeedbackComponentsStateContextType {
  lottieLoading: LottieLoading;
  setLottieLoading: Dispatch<SetStateAction<LottieLoading>>;
}

const FeedbackComponentsStateContext = createContext<
  FeedbackComponentsStateContextType | undefined
>(undefined);

interface FeedbackComponentsStateProviderProps {
  children: ReactNode;
}

export const FeedbackComponentsStateProvider: React.FC<
  FeedbackComponentsStateProviderProps
> = ({ children }) => {
  const [lottieLoading, setLottieLoading] = useState<LottieLoading>({
    visible: true,
  });

  const providerChildren = {
    lottieLoading,
    setLottieLoading,
  };

  return (
    <FeedbackComponentsStateContext.Provider value={providerChildren}>
      {children}
    </FeedbackComponentsStateContext.Provider>
  );
};

export default FeedbackComponentsStateContext;
