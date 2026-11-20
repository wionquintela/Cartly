import { useSSO } from "@clerk/expo";
import { Dispatch, SetStateAction, useState } from "react";
import { Alert } from "react-native";

interface ChildProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function useSocialAuth({ showModal, setShowModal }: ChildProps) {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  //from clerk SSO
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple", //only accept this specific oAuths
  ) => {
    //guard-wont allow duplicate strategy SS0s
    if (loadingStrategy) return;

    //set the chosen SSO account
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy }); //open up the specific oAuth and destructure sessionId and setActive
      if (!createdSessionId || !setActive) {
        setShowModal(!showModal);
        return;
      }
      //set session with ID
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error in social auth, ", error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };
  //return
  return { handleSocialAuth, loadingStrategy };
}
