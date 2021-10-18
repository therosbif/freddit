import React from "react";
import { Modal } from "react-native";
import RTWebView from "./core/RTWebView";
import { redirectUri } from "../constants";

const failureUri = "unknown";
const signInUri = "https://reactnative.dev/blog/2018/05/07/using-typescript-with-react-native";

export default SignInModal = ({ onSuccess, onFailure, onClose }) => {

  return (
    <Modal
      animationType="slide"
    >
      <RTWebView
        source={{ uri: signInUri }}
        onLoad={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;

          if (nativeEvent.url === redirectUri) {
            onSuccess();
          } else if (nativeEvent.url === failureUri) {
            onFailure();
          }
        }}
        onClose={onClose}
      />
    </Modal>
  );
}