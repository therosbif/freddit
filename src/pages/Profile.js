import React from "react"
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export default Profile = () => {
  const theme = useTheme();
  const styles = useStyle(theme.palette);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>PROFILE PAGE</Text>
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