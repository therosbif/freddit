import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export default SplashScreen = () => {
  const theme = useTheme();
  const styles = useStyle(theme.palette);

  return (
    <View style={styles.root}>
      <Image source={require('../assets/jack.png')} />
    </View>
  )
}

const useStyle = (palette) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  }
})