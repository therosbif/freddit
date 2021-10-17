import React from "react";
import { Image, StyleSheet } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export default RTIcon = ({ source, style }) => {
  const theme = useTheme();
  const styles = useStyle(theme.palette);

  return (
    <Image
      source={source}
      style={{ ...styles.image, ...style }}
    />
  )
}

const useStyle = (palette) => StyleSheet.create({
  image: {
    tintColor: palette.PRIMARY,
  }
})