import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native";
import { useTheme, Text, Portal } from "react-native-paper";
import ImageViewer from "../components/core/ImageViewer";

export default Search = ({ route }) => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);

  useEffect(() => {
    console.log("TEST");
    console.log(route?.params?.test);
  }, [route])

  return (
    <View style={styles.root}>
      <Text>SEARCH PAGE</Text>
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