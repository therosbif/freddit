import React from "react"
import { StyleSheet, View } from "react-native";
import { useTheme, Text } from "react-native-paper";

export default Post = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);

  return (
    <View style={styles.root}>
      <Text>POST PAGE</Text>
    </View>
  )
}

const useStyle = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
})