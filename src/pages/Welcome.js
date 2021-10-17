import React from "react";
import { Text, View } from "react-native";
import RTButton from "../components/RTButton";
import { useRuntimeInfo } from "../providers/RuntimeInfoProvider";
import { useTheme } from "../providers/ThemeProvider";

export default Welcome = () => {
  const theme = useTheme();
  const runtimeInfo = useRuntimeInfo();

  return (
    <View style={{ backgroundColor: theme.palette.BACKGROUND, flex: 1 }}>
      <Text style={{ color: theme.palette.TEXT }}>WELCOME!</Text>
      <RTButton title="DONE" onPress={() => {
        runtimeInfo.setFirstRun(false);
      }} />
    </View>
  )
}