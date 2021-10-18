import React from "react"
import { Button, StyleSheet, Text, View } from "react-native";
import RTButton from "../components/core/RTButton";
import { useRuntimeInfo } from "../providers/RuntimeInfoProvider";
import { useTheme } from "../providers/ThemeProvider";

export default Home = () => {
  const theme = useTheme();
  const styles = useStyle(theme.palette);
  const rtInfo = useRuntimeInfo();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>HOME PAGE</Text>
      <RTButton title="clear" onPress={rtInfo.reset}></RTButton>
    </View>
  )
}

const useStyle = (palette) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: palette.TEXT,
  }
})