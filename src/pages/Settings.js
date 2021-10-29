import { useNavigation } from "@react-navigation/core";
import React from "react"
import { StyleSheet, View } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { useAuth } from "../providers/AuthProvider";

export default Settings = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const { logout } = useAuth();
  const nav = useNavigation();

  return (
    <View style={styles.root}>
      <Button onPress={() => { logout() }}>Log Out</Button>
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