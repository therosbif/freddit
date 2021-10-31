import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default SplashScreen = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);

  return (
    <View style={styles.root}>
      <Image source={require('../assets/jack.png')} />
    </View>
  )
}

const useStyle = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  }
})